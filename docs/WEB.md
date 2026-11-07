# Nooble browser builder

The browser is Nooble's primary interface. It prepares an editable MiniMax H3 notebook; generation runs in your own Google Colab account. The [core notebook](../MiniMax_H3_Colab.ipynb) also works directly. The [Windows v0.2.0 companion](DESKTOP.md) remains available as an optional legacy interface.

The [public Vercel site](https://nooble.vercel.app) was deployed November 8, 2026. Anyone can open the builder, without a Nooble account or subscription. The [earlier hosted preview](https://gooblelab-notebook-builder.helpfulaisle2.chatgpt.site) remains available during the move. Projects remain local to each browser and origin; projects saved on localhost or the previous host do not automatically appear on the Vercel site.

## Run locally

From the repository root, with Node.js and Python installed:

```sh
node web/build.mjs
python -m http.server 8765 --bind 127.0.0.1 --directory web/dist
```

Open [the local builder](http://127.0.0.1:8765/). There are no npm dependencies. Rebuild after changing the browser files, notebook or preset catalog. Serve the generated directory over HTTP; opening `index.html` as a local file does not load its notebook resources reliably.

The static build versions linked scripts, styles and notebook resources by content, so a refresh loads the updated builder rather than mixing cached releases.

## Deploy on Vercel

The repository includes `vercel.json` for a static deployment. Use the **repository root** as Root Directory, **Other** as Framework Preset, `node web/build.mjs` as Build Command and `web/dist` as Output Directory. Installation is skipped because the builder has no npm dependencies. The root notebook and preset catalog are required during the build; selecting `web` as Root Directory would leave those inputs outside the project.

For Git deployments, import [narcisoJavier/Nooble](https://github.com/narcisoJavier/Nooble) into the intended Vercel team. For an authenticated CLI deployment, run these from the repository root, replacing `YOUR_TEAM` with that team's slug:

```sh
vercel link --yes --scope YOUR_TEAM --project nooble
vercel deploy --prod --scope YOUR_TEAM
```

The CLI link is stored in ignored `.vercel/`. `.vercelignore` uploads only the builder and its inputs; Vercel serves the generated output directory. Hash navigation needs no catch-all rewrite. CLI deployment alone does not establish automatic Git deployments.

**Hosting plan:** Nooble is a free, open-source personal project with no subscriptions, paid features or product sales. Vercel restricts Hobby to noncommercial personal use and explicitly allows donation requests. Optional voluntary donations are a future possibility; no Ko-fi account is connected. Commercial use would require reassessing the plan under [Vercel's commercial-use policy](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage).

After deployment, check the production URL without signing in, complete a notebook download, and register the exact new HTTPS origin in the Google Web OAuth client's authorized JavaScript origins before trying Drive upload. Saved projects belong to each origin and will not automatically transfer from localhost or the previous host. Keep the existing hosted preview available until the replacement is verified.

## Build and download a notebook

1. Choose **Template → Settings → Export / upload**. Text, first-frame image and reference-image workflows are all free. The initial defaults are FL2VA Turbo 8, 1344×768, a requested 5 seconds and seed `12345`.
2. Customize the prompt, one of five H3 presets, resolution, 4–15 second duration, exact unsigned 64-bit seed and compatible custom LoRA controls. There are no plan switches, subscriptions or paid features.
3. Click **Download .ipynb**. In Colab choose **File → Upload notebook**, select **A100 + high RAM**, and run Steps 1–5 in order. The plan shows the actual duration after H3 frame-count rounding; a requested 5 seconds produces about 5.17 seconds.
4. Finish with Step 6's `STOP_BACKEND`, then disconnect and delete the Colab runtime. See the [main guide](../README.md#quick-start) for compute, storage and output locations.

All exports retain the six editable code cells and Colab form annotations, with execution counts and outputs cleared. Settings remain editable in the notebook. Downloading requires no Google connection in Nooble.

Image and reference workflows accept PNG, JPEG or WebP selections up to 25 MiB. A downloaded notebook includes neither the image nor a device path: Step 5 asks you to upload exactly one image into the Colab runtime. For Ref2VA, refer to it as `<Picture 1>` in your prompt. The experimental Ref2VA Turbo 4 preset was trained at 544p; try 960×544.

Custom LoRAs must match the selected H3 family. Use an HTTPS Hugging Face `.safetensors` file URL or `/content/drive/MyDrive/...` path, with strength from 0 to 2. Put private download credentials in Colab's `HF_TOKEN` secret. URLs with credentials, tokens or traversal are rejected.

## Saved projects and privacy

**Save project** keeps up to 20 configurations in this browser's local storage. Records contain names, prompts, settings and the selected image's filename. Image files, OAuth client IDs and Google access tokens are not saved with projects. Reselect an image before a Drive upload after reopening a project; downloaded notebooks can still ask for it inside Colab.

Projects do not sync across devices or browser profiles. Clearing site data removes them. Download a notebook to keep a portable copy. Google tokens stay in page memory and are discarded on disconnect or when the page closes. There are no Nooble accounts, cloud project storage or billing in this preview.

## Where data lives and how to remove it

| Data | Location and lifetime | Removal |
| --- | --- | --- |
| Saved name, prompt, settings, image filename | This site's browser storage, across page sessions | Remove the project in Saved projects or clear this site's browser data. |
| Selected image bytes | Page memory until replaced, removed or the page closes | Remove the image or close the page; this does not delete your original file. |
| Google access token | Page memory for this session | Disconnect or close the page. Manage an existing OAuth grant separately in your Google account. |
| Public Google OAuth client ID | Page memory until the page closes | Close the page; disconnecting clears the token but retains this public setup value. |
| Downloaded notebook | Your download folder; includes the prompt/settings | Delete or move the file yourself. Local project removal does not affect it. |
| Uploaded notebook and image | A new private folder in your Google Drive; persists after disconnect | Manage the folder in Drive. Failed uploads can leave partial folders. |
| MP4 and `workflow_api.json` | The configured Colab output directory; workflow JSON includes the prompt/settings | Manage outputs in Drive, or download needed files before deleting a temporary runtime. |
| Model cache | My Drive → ComfyUI_Models, or temporary `/content/H3_models` | Manage the cache separately. Stopping ComfyUI does not delete cached models. |

Browser `drive.file` authorization and Colab's `drive.mount()` are different permissions. The browser upload is limited to app-accessible files; mounting Drive lets notebook code access the mounted Drive and is authorized separately inside Colab. Review the notebook before granting that access. [Google explains mounted Drive access](https://research.google.com/colaboratory/faq.html).

Never post an unredacted notebook, workflow JSON, log or private media in a public bug report. This table describes the preview's behavior; it is not a substitute for the operator-specific privacy policy needed before a public service launch.

## Optional Google Drive upload preview

Live Google authorization and upload have **not yet been verified**. Download remains available without this setup.

1. Follow [Google's web OAuth setup](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid): create a Google Cloud project, enable Drive API, configure consent and the `https://www.googleapis.com/auth/drive.file` scope, and create a **Web application** client.
2. Add the exact origin shown in the builder's Google setup panel to **Authorized JavaScript origins**, including the local port when testing. Register a hosted preview's origin separately. Configure test users if your OAuth consent configuration requires them.
3. Paste the public **Web OAuth client ID** in **Google Drive setup for this preview**, then choose **Prepare Google connection → Connect Google Drive**. Desktop OAuth JSON files and client secrets do not belong in this browser flow.
4. After consent, click **Upload to Drive & open Colab**. The app creates a fresh private My Drive folder, uploads the notebook and any selected image, and presents Colab and folder links. The notebook uses the mounted Drive image path. Uploading does not start a GPU runtime or share files.

Expired sessions require reconnecting. If an upload fails after creating files, a partial private folder may remain; check Drive before retrying. Choosing **Disconnect** clears the page session; manage any persistent OAuth grant through your Google account.

## Check the exporter

```sh
node --test web/test-notebook.mjs web/test-drive.mjs
```

Offline checks cover clean notebook export, safe prompt quoting, exact maximum seeds, preset/dimension/LoRA validation and mocked Drive requests. They do not establish live OAuth or GPU inference behavior. Project direction and validation priorities are in [SAAS.md](SAAS.md).
