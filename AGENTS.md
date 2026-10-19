<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Motion preference reads use `useMotionPreference` after mounting so SSR and initial browser markup remain identical.
- GSAP exclusively owns the hero text sequence; load it inside the component effect and revert scoped timelines on slide changes to avoid competing transforms.
- Hero posters remain explicit image layers beneath video so covers survive unavailable browser codecs; preserve existing media paths and CMS APIs.
