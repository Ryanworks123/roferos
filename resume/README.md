# Ryan Roferos Resume

The editable resume source is `Ryan_Roferos_Resume.html`. It is designed for:

- one A4 page
- ATS-readable text and headings
- browser printing without headers or footers
- clickable contact, portfolio, LinkedIn, and GitHub links

Generate the public PDF from the repository root:

```powershell
& 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' `
  --headless `
  --disable-gpu `
  --no-pdf-header-footer `
  --print-to-pdf="$PWD\public\Ryan_Roferos_Resume.pdf" `
  "$PWD\resume\Ryan_Roferos_Resume.html"
```
