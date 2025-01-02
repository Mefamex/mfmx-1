import os, datetime

# Set the directory path where your HTML files are located
os.chdir("..")
directory_path = os.getcwd()

# Set the base URL for your website
base_url = "https://mefamex.com/"

# Set the changefreq and priority values
changefreq = "daily"
priority = "1.0"

# Get the current timestamp not file
current_timestamp = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S+00:00")

# Create the sitemap.xml file
sitemap_file = open("sitemap_auto.xml", "w")

# Write the XML header
sitemap_file.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n')

# Iterate through the HTML files in the directory
for root, dirs, files in os.walk(directory_path):
    for file in files:
        if file.endswith(".html"):
            # Get the file path and URL
            file_url = base_url + root.replace(directory_path, "").replace("\\", "/")

            # Write the URL entry to the sitemap.xml file
            sitemap_file.write("  <url>\n")
            sitemap_file.write("    <loc>" + file_url + "/</loc>\n")
            sitemap_file.write("    <lastmod>" + current_timestamp + "</lastmod>\n")
            sitemap_file.write("    <changefreq>" + changefreq + "</changefreq>\n")
            sitemap_file.write("    <priority>" + priority + "</priority>\n")
            sitemap_file.write("  </url>\n")


# Write the XML footer
sitemap_file.write("</urlset>\n")

# Close the sitemap.xml file
sitemap_file.close()

print("Sitemap.xml file generated successfully!")
