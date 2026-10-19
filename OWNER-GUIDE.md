# Updating your store

Open `/owner/` on the website to download the current product CSV or the Excel starter workbook. Keep the current CSV as the source when products have already changed; the workbook is the initial 24-product starter.

1. Open the CSV in Excel or Google Sheets. In the workbook, edit the Products sheet.
2. Replace sample names with exact brands/models, confirm car fitment, and add your real photo links in image_1 through image_4.
3. Fill in starting prices in INR. Leave unknown prices blank. Set includes_fitting to true if the product price includes fitting; otherwise enter the separate fitting_price. A zero fitting price means free; a blank fitting price means it still needs a quote.
4. Add actual fitting_time and warranty terms. Set sample to false only after the item is checked.
5. Export the Products sheet as CSV UTF-8. Upload it to the checker at `/owner/` to see validation errors or a preview.
6. Send the checked CSV in this chat for publishing. A developer can instead replace `data/products.csv` and run `npm run build`, verify the export, and deploy it. The site remains static: uploading to the checker does not save or change the live catalogue.

The build accepts an optional HTTPS `PRODUCTS_CSV_URL` environment variable pointing to an owner-published Google Sheets CSV export. It fetches that file at build time. It is not live synchronisation, and this project does not automatically publish or change any Google Sheet permissions. Never place credentials or private customer information in a public catalogue sheet.

## Customer reviews

Download the review CSV at `/owner/reviews.csv`. Each row contains name, quote, rating, source_url, approved and verified. Enter the exact approved quote and its original source URL. Only approved and verified rows are shown. Save as `data/reviews.csv` before rebuilding, or send it in this chat.

## Installation photographs

Download `/owner/installations.csv`. Supply the car model, accessory, before_image and after_image links, caption and approval. Use only actual photographs you have permission to publish. Save as `data/installations.csv` before rebuilding, or send the CSV and photos in this chat. No stock or AI photographs are presented as completed shop work.

## Google profile and service terms

Download `/owner/business-details.csv`. Fill in the exact googleProfileUrl and googleReviewsUrl, then set googleProfileVerified to true after checking the profile belongs to this store. Confirm the existing supplied rating and review count before setting ratingVerified. The website otherwise links to a Google Maps name/address search, and does not claim that an exact profile was verified.

The same file can set defaultWarranty, defaultFittingTime and quoteNote. Product-specific values take precedence. Leave unknown terms blank. Save as `data/business-details.csv` before rebuilding, or send it in this chat. Google Business Profile edits themselves must be made by the profile owner in Google; updating this site does not edit that external profile.

## What is still needed

The current 24 products and generated category pictures remain explicitly marked samples. Real prices, actual branded inventory, unique product photos, installation photos, verified review quotes, fitting/warranty terms and the exact Google profile must come from the owner. Unknown values are not filled with invented data.

## Website improvements included

The chosen car, year and variant are stored only in the visitor's browser and carried into product links, form estimates and WhatsApp enquiries. Clear saved car removes them. On phones, the product title, price and enquiry actions appear before the image gallery, with product-aware sticky actions at the bottom.

The Upgrade Garage illustrates sound, comfort and style choices, linking each to its catalogue category. Scroll reveals, image hover effects and interaction feedback respect reduced-motion preferences; no looped animation is used.
