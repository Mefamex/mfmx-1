# DOMAIN NOTES 

> mefamex.com <br>
> created: 2025-09-02 <br>


<br><br>



## DNS RECORDS

### A 

A kayıtları, alan adının hangi IP adresine yönlendirileceğini belirtir. Bu, web sitenizin barındırıldığı sunucunun IP adresidir.

- type : A
- name : @
- IP address : (örnek) 192.0.2.1
- TTL : auto


<br><br>


### AAAA 

AAAA kayıtları, alan adının hangi IPv6 adresine yönlendirileceğini belirtir. Bu, web sitenizin barındırıldığı sunucunun IPv6 adresidir.

- type : AAAA
- name : @
- IP address : (örnek) 2001:db8::1
- TTL : auto


<br><br>


### CNAME

CNAME kayıtları, alan adının başka bir alan adına yönlendirilmesini sağlar. Bu, bir alan adının başka bir alan adıyla aynı IP adresini paylaşmasını sağlar.

- type : CNAME
- name : (örnek) www
- value : (örnek) mefamex.com
- TTL : auto


- type : CNAME
- name : (örnek) mefamex.com
- value : (örnek) mfmx.pages.dev
- TTL : auto

<br><br>


### CAA

CAA kayıtları, alan adının hangi sertifika otoritesine ait olduğunu belirtir. Bu, alan adınız için SSL/TLS sertifikası talep eden kuruluşu tanımlar.

- type : CAA
- name : @
- TTL : auto
- flags : 0
- tag :  (örnek) Send violation reports to URL (http:, https:, or mailto:)
- value : (örnek) mailto:ssl-admin@mefamex.com


<br><br>



### MX 

E-posta iletiminde, e-postaların doğru sunuculara yönlendirilmesini sağlamak için kullanılır. Bu kayıtlar, alan adının hangi e-posta sunucusuna ait olduğunu belirtir.

- type : MX 
- name : @
- mail server: (örnek) smtp.google.com
- TTL : auto
- priority : 1 (en yüksek)



<br><br>



### TXT

TXT kayıtları, alan adınıza ait metin tabanlı bilgileri saklamak için kullanılır. Bu kayıtlar, genellikle SPF, DKIM ve DMARC gibi e-posta doğrulama yöntemleri için kullanılır.

- dmarc kayıdı
- google._domainkey
- google-site-verification
- "v=spf1 include:_spf.google.com ~all"




<br><br><br>




## HTTP -> HTTPS 

- Yönlendirmeleri ile HTTP istekleri otomatik olarak HTTPS'ye yönlendirilir.
- Kullandığın .htaccess dosyası ile yönlendirmeleri ayarlayabilirsin.

Cloudflare'da **Always Use HTTPS** seçeneğini etkinleştirerek tüm HTTP isteklerini otomatik olarak HTTPS'ye yönlendirebilirsin.


<br><br><br>







## YÖNLENDİRME KONTROLÜ
**curl -IL (full-url)**

Bu komut, belirtilen URL'nin HTTP başlıklarını almak için kullanılır. Yanıt, yönlendirmeleri kontrol etmek için incelenebilir.
