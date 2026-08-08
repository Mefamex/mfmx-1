#!/bin/bash

set -e

# 1. git-filter-repo kontrolü
if ! command -v git-filter-repo &>/dev/null && ! git filter-repo -h &>/dev/null; then
	echo "❌ Hata: 'git-filter-repo' kurulu değil."
	echo "Lütfen önce yükleyin: pip install git-filter-repo"
	exit 1
fi

# 2. Çalışma alanı temizlik kontrolü
if [ -n "$(git status --porcelain)" ]; then
	echo "❌ Hata: Çalışma alanında kaydedilmemiş değişiklikler var. Lütfen önce commit yapın veya stash kullanın."
	exit 1
fi

echo "🔍 Tüm dallar ve geçmiş analiz ediliyor..."

# Uzak sunucu adresini yedekle (git filter-repo bunu silecektir)
REMOTE_URL=$(git remote get-url origin 2>/dev/null || true)

# 3. Tüm geçmişte var olmuş tüm dosyalar (quotePath kapatılarak)
git -c core.quotePath=false log --all --name-only --pretty=format:"" | sed '/^\s*$/d' | sort -u >all_historical.txt

# 4. Tüm aktif dallarda (branches) ve etiketlerde (tags) şu an var olan dosyalar
git -c core.quotePath=false ls-tree -r --name-only $(git rev-parse --branches --tags) | sort -u >current_files.txt

# 5. Silinmiş dosyaları tespit et
comm -23 all_historical.txt current_files.txt >deleted_files.txt

DELETED_COUNT=$(wc -l <deleted_files.txt)

if [ "$DELETED_COUNT" -eq 0 ]; then
	echo "✅ Geçmişte kalmış silinmiş dosya bulunamadı. Repo temiz!"
	rm -f all_historical.txt current_files.txt deleted_files.txt
	exit 0
fi

echo "🗑️  Tüm dallarda şu an bulunmayan ama geçmişte yer alan $DELETED_COUNT adet dosya tespit edildi."
echo "Örnek silinecek dosyalar:"
head -n 5 deleted_files.txt
echo "..."

read -p "⚠️  Bu dosyaları Git geçmişinden KALICI OLARAK silmek istiyor musunuz? (e/h): " confirm

if [[ "$confirm" == "e" || "$confirm" == "E" ]]; then
	echo "🚀 Geçmiş temizleniyor..."

	git filter-repo --paths-from-file deleted_files.txt --invert-paths --force

	git reflog expire --expire=now --all
	git gc --prune=now --aggressive

	# Remote bilgisini geri ekle
	if [ -n "$REMOTE_URL" ]; then
		git remote add origin "$REMOTE_URL" 2>/dev/null || git remote set-url origin "$REMOTE_URL"
	fi

	echo "🎉 Temizlik tamamlandı!"
	echo "⚠️  Değişiklikleri uzak sunucuya aktarmak için: git push --force origin --all"
else
	echo "❌ İşlem iptal edildi."
fi

rm -f all_historical.txt current_files.txt deleted_files.txt
