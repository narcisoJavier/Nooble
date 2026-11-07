# Nooble project direction and readiness

Updated November 8, 2026. Nooble is a **free, open-source personal project**, with no subscriptions, paid features, sales or advertising. All browser templates and customization controls are available to everyone. This document retains its original filename so existing links continue to work; the earlier SaaS proposal has been retired.

## Support and hosting

Support is voluntary: [explore the maintainer's other projects](https://github.com/narcisoJavier?tab=repositories) and star the ones you find useful. The builder's About page and footer link to this list. Stars do not unlock features; all settings remain free without GitHub sign-in. No stars are verified or added automatically, and no payment or donation account is connected.

Vercel Hobby restricts deployments to noncommercial personal use and explicitly permits asking for donations. See [Vercel's fair-use policy](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage). Reassess hosting before introducing any commercial use. No paid hosting upgrade has been started.

Free means no Nooble charge. It does not include a Google GPU, Drive storage or guaranteed runtime availability. Each user opens the exported notebook and runs it interactively in their own Colab account. Nooble does not share or resell an operator's Colab runtime.

## What is implemented

- A static browser builder and editable notebook, with text, image and reference workflows, five H3 presets and compatible existing LoRA configuration.
- Browser-local projects and notebook download, with no accounts, cloud project sync or billing backend.
- An optional Google Drive upload path using a user-supplied Web OAuth client and memory-only access tokens. Live authorization and upload remain unverified.
- An optional legacy Windows companion. The notebook remains the core output.

Keep this architecture until an actual user need requires more. There is no payment integration or account service to build for the current direction.

## Validation priorities

Only the original FL2VA Turbo 8 notebook at 864×480 has a recorded successful GPU run. Offline checks do not establish current GPU compatibility or generation quality.

| Path | Current evidence | Next validation |
| --- | --- | --- |
| Browser notebook export | Automated checks and manual browser download | Preserve clean cells and correct settings on each release. |
| Current Turbo 8 at 1344×768 | Offline graph/export checks | Fresh and cached A100 runs; record timings, memory and MP4 audio/video playback. |
| Other presets and image/reference paths | Offline checks | Separate actual GPU runs; retain the experimental Ref2VA Turbo 4 label. |
| Compatible custom LoRA | Parsing/loading graph checks | An appropriately licensed adapter per supported family and an actual output. No training claim. |
| Browser Drive upload | Mocked request tests | Live consent, cancellation, reconnect, image upload, partial failures and opening the uploaded notebook. |

Run `python scripts/check.py` before publishing. Record GPU evidence with the release/commit, environment, preset, settings, timings and redacted errors. The notebook loads the immutable `v0.2.0` runtime; changing `main` alone does not update it. Follow [CONTRIBUTING.md](../CONTRIBUTING.md) when publishing a new runtime. Hosted CI is not yet configured.

## Privacy and operations

Saved projects belong to the current browser and origin. A new deployment domain does not transfer them. Notebooks and workflow JSON contain prompts; downloaded files, Drive uploads and model/output caches outlive local project removal. See the [browser data guide](WEB.md#where-data-lives-and-how-to-remove-it). Keep private prompts, media and credentials out of public issue reports.

Keep download available without Google sign-in. Before offering a shared public OAuth application, configure the operator-owned production project, exact authorized origins and an accurate privacy policy; verification depends on the application's configuration. Sources: [Google production OAuth policy](https://developers.google.com/identity/protocols/oauth2/production-readiness/policy-compliance), [Drive scopes](https://developers.google.com/workspace/drive/api/guides/api-specific-auth).

Maintain a reproducible static build, a rollback deployment and clear issue/support ownership. Resolve actual onboarding failures before expanding to other model families.

## Platform and model conditions

[Colab's terms](https://research.google.com/colaboratory/tos_v6.html) and [FAQ](https://research.google.com/colaboratory/faq.html) apply to each user's execution and compute access. Keep the workflow interactive in their own notebook and do not promise guaranteed GPUs or free A100 access.

The [MiniMax H3 license](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/LICENSE) has territory and commercial conditions, including exclusions in its default territory. Repository MIT licensing does not replace those model terms. Check applicability to the user's location and use; a free builder is not a grant of worldwide model rights.
