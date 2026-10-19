"use client";
import { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  products,
  cars,
  categories,
  Product,
  productPriceLabel,
} from "@/lib/catalogue";
import { productsFromCSV, productsToCSV } from "@/lib/catalogue-csv.mjs";
export default function OwnerCatalogue() {
  const [staged, setStaged] = useState<Product[] | null>(null);
  const [error, setError] = useState("");
  const download = (name: string, content: string) => {
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="owner-workspace container">
      <div className="owner-steps">
        <article>
          <span>01</span>
          <h2>EDIT IN YOUR SPREADSHEET</h2>
          <p>
            Download the current CSV and open it in Excel or Google Sheets. Fill
            in exact products, real photo links, fitted prices, fitment and
            warranty. Keep unknown prices blank.
          </p>
          <a className="button button-gold" href="/owner/products.csv" download>
            <Download size={17} />
            Current product CSV
          </a>
          <a
            className="text-link"
            href="/owner/product-catalogue.xlsx"
            download
          >
            Download the Excel starter workbook
          </a>
        </article>
        <article>
          <span>02</span>
          <h2>CHECK YOUR CHANGES</h2>
          <p>
            Export the Products sheet as CSV UTF-8. Select it here to check
            columns, prices, car models and product identifiers. This check runs
            in your browser.
          </p>
          <label className="file-input">
            Choose updated CSV
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={async (e) => {
                setError("");
                setStaged(null);
                const file = e.target.files?.[0];
                if (!file) return;
                try {
                  if (file.size > 5 * 1024 * 1024)
                    throw new Error("Use a CSV smaller than 5 MB");
                  setStaged(
                    productsFromCSV(await file.text(), {
                      cars,
                      categories,
                      previous: products,
                    }) as Product[],
                  );
                } catch (err) {
                  setError(
                    err instanceof Error ? err.message : "Unable to read CSV",
                  );
                }
              }}
            />
          </label>
        </article>
        <article>
          <span>03</span>
          <h2>PUBLISH THE CHECKED FILE</h2>
          <p>
            Send the checked CSV in this chat for publishing. For a
            developer-managed deployment, replace data/products.csv and rebuild.
            The spreadsheet imports automatically at build time.
          </p>
          <p className="owner-note">
            Selecting a file here does not change the live website. No login
            secrets or payment information belong in the catalogue.
          </p>
        </article>
      </div>
      {error && (
        <p role="alert" className="import-error">
          <AlertCircle size={19} />
          {error}
        </p>
      )}
      {staged && (
        <section className="staged-products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">VALIDATION PASSED</span>
              <h2>{staged.length} PRODUCTS READY TO REVIEW</h2>
              <p>
                {staged.filter((p) => p.sample).length} sample listings ·{" "}
                {staged.filter((p) => p.price !== null).length} products with a
                starting price
              </p>
            </div>
            <button
              className="button button-gold"
              onClick={() =>
                download("products-checked.csv", productsToCSV(staged))
              }
            >
              <Download size={18} />
              Download checked CSV
            </button>
          </div>
          <div className="owner-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Fitting</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {staged.slice(0, 12).map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.brand}</td>
                    <td>{productPriceLabel(p)}</td>
                    <td>
                      {p.includesFitting
                        ? "Included"
                        : p.fittingPrice == null
                          ? "Quote separately"
                          : `₹${p.fittingPrice}`}
                    </td>
                    <td>{p.sample ? "Sample" : "Owner confirmed"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="small-note">
            Showing the first {Math.min(staged.length, 12)} products. Download
            includes every row.
          </p>
        </section>
      )}
      <section className="owner-column-guide">
        <h2>WHAT TO FILL IN</h2>
        <dl>
          <div>
            <dt>Price and fitting</dt>
            <dd>
              price is the product starting price in INR. If fitting is
              included, set includes_fitting to true. Otherwise add
              fitting_price to show a fitted total. Blank means unknown; zero
              means free.
            </dd>
          </div>
          <div>
            <dt>Car models</dt>
            <dd>
              Use comma-separated models from the current car list. For
              universal accessories set universal to true. Fitment must still be
              confirmed for the customer’s year and variant.
            </dd>
          </div>
          <div>
            <dt>Photos</dt>
            <dd>
              Use image_1 to image_4 for real, permitted photo URLs or uploaded
              local image paths. Avoid renaming existing product IDs or slugs.
            </dd>
          </div>
          <div>
            <dt>Confirmed inventory</dt>
            <dd>
              Change sample to false only when the actual name, brand, fitment,
              photos and description have been checked. Keep warranty and
              fitting_time blank until confirmed.
            </dd>
          </div>
        </dl>
      </section>
      <section className="owner-trust-setup">
        <h2>KEEP THE SHOP DETAILS CURRENT</h2>
        <p>
          Use these sheets for actual customer quotes, approved installation
          photographs and the exact Google Business Profile link. Send the
          edited CSV files in this chat, or save them as data/reviews.csv,
          data/installations.csv and data/business-details.csv before
          rebuilding.
        </p>
        <div className="owner-template-links">
          <a
            className="button button-outline"
            href="/owner/reviews.csv"
            download
          >
            Review sheet
          </a>
          <a
            className="button button-outline"
            href="/owner/installations.csv"
            download
          >
            Installation photo sheet
          </a>
          <a
            className="button button-outline"
            href="/owner/business-details.csv"
            download
          >
            Google profile & service terms
          </a>
        </div>
        <p>
          Publish reviews only with an original source URL and verified/approved
          set to true. Installation images need before/after links and approval.
          Leave unknown warranty and fitting-time fields blank.
        </p>
        <p>
          The site links to a Google Maps search until the exact profile URL is
          supplied. Changes to the Google Business Profile itself must be made
          by its owner in Google.
        </p>
      </section>
    </div>
  );
}
