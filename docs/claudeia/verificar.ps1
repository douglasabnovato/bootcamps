<#
  verificar.ps1 — verificação local do projeto bootcamps (learnTECH).
  Rode na RAIZ do projeto:
      powershell -ExecutionPolicy Bypass -File docs\claudeia\verificar.ps1
  Opções:
      -PularInstalacao   não roda "npm ci" (usa o node_modules que já existe)
  Para no primeiro erro. Avisos (AVISO) não param o script.
#>
param(
  [switch]$PularInstalacao
)

$ErrorActionPreference = 'Stop'
$script:avisos = 0

function Etapa([string]$numero, [string]$titulo, [string]$confere) {
  Write-Host ''
  Write-Host "[$numero] $titulo" -ForegroundColor Cyan
  Write-Host "     Confere: $confere" -ForegroundColor DarkGray
}
function Ok([string]$msg)    { Write-Host "     OK  $msg" -ForegroundColor Green }
function Aviso([string]$msg) { Write-Host "     AVISO  $msg" -ForegroundColor Yellow; $script:avisos++ }
function Falha([string]$msg) { Write-Host "     FALHOU  $msg" -ForegroundColor Red; exit 1 }

function Rodar([string]$comando) {
  Write-Host "     > $comando" -ForegroundColor DarkGray
  & cmd /c $comando
  if ($LASTEXITCODE -ne 0) { Falha "'$comando' terminou com código $LASTEXITCODE" }
}

# 0 ---------------------------------------------------------------------------
Etapa '0' 'Pasta do projeto' 'o script está rodando na raiz do bootcamps'
if (-not (Test-Path 'package.json')) { Falha 'package.json não encontrado. Rode na raiz do projeto.' }
$pkg = Get-Content 'package.json' -Raw -Encoding UTF8 | ConvertFrom-Json
if ($pkg.name -ne 'learntech-bootcamps') { Falha "package.json é de '$($pkg.name)', esperado 'learntech-bootcamps'." }
Ok 'raiz do learntech-bootcamps'

# 1 ---------------------------------------------------------------------------
Etapa '1' 'Node.js e npm' 'Node 20.19+ ou 22.12+ (exigência do Vite 7) e npm disponíveis'
try { $nodeV = (& node -v).Trim() } catch { Falha 'node não encontrado no PATH.' }
try { $npmV = (& cmd /c 'npm -v').Trim() } catch { Falha 'npm não encontrado no PATH.' }
$v = [version]($nodeV.TrimStart('v'))
$okNode = ($v.Major -ge 23) -or ($v.Major -eq 22 -and $v.Minor -ge 12) -or ($v.Major -eq 20 -and $v.Minor -ge 19)
if (-not $okNode) { Falha "Node $nodeV é antigo para o Vite 7. Instale Node 22 LTS." }
Ok "node $nodeV · npm $npmV"

# 2 ---------------------------------------------------------------------------
Etapa '2' 'Instalação (npm ci)' 'as dependências instalam exatamente como no package-lock.json'
if ($PularInstalacao) {
  if (-not (Test-Path 'node_modules')) { Falha 'node_modules não existe; rode sem -PularInstalacao.' }
  Ok 'pulado a pedido (-PularInstalacao)'
} else {
  Rodar 'npm ci'
  Ok 'dependências instaladas'
}

# 3 ---------------------------------------------------------------------------
Etapa '3' 'Lint (npm run lint)' 'regras do ESLint, typescript-eslint e react-hooks em src/'
Rodar 'npm run lint'
Ok 'lint sem erros'

# 4 ---------------------------------------------------------------------------
Etapa '4' 'Build (npm run build = tsc -b && vite build)' 'tipos do TypeScript strict e geração do pacote de produção em dist/'
Rodar 'npm run build'
Ok 'build concluído'

# 5 ---------------------------------------------------------------------------
Etapa '5' 'Saída do build' 'dist/index.html existe e os sites estáticos de public/ foram copiados'
foreach ($f in @('dist\index.html',
                 'dist\eventos-vivos\byteclass.dev\index.html',
                 'dist\eventos-vivos\bq-agenda-tech\index.html',
                 'dist\site.webmanifest')) {
  if (-not (Test-Path $f)) { Falha "faltando $f" }
}
$js = Get-ChildItem 'dist\assets' -Filter *.js -ErrorAction SilentlyContinue
if (-not $js) { Falha 'nenhum .js em dist\assets' }
$kb = [math]::Round((($js | Measure-Object Length -Sum).Sum) / 1KB)
Ok "dist completo · $($js.Count) arquivos .js somando $kb KB (sem gzip)"

# 6 ---------------------------------------------------------------------------
Etapa '6' 'Ícones e manifest do index.html' 'todo href="/..." do index.html existe em public/'
$html = Get-Content 'index.html' -Raw -Encoding UTF8
$refs = [regex]::Matches($html, 'href="/([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
foreach ($r in $refs) {
  if (-not (Test-Path (Join-Path 'public' $r))) { Falha "index.html aponta para /$r, que não existe em public/" }
}
Ok "$($refs.Count) referências conferidas"

# 7 ---------------------------------------------------------------------------
Etapa '7' 'Imports de mídia do catálogo' 'cada "@/assets/..." de events.data.ts existe em src/assets'
$dados = Get-Content 'src\entities\event\api\events.data.ts' -Raw -Encoding UTF8
$imps = [regex]::Matches($dados, '"@/(assets/[^"]+)"') | ForEach-Object { $_.Groups[1].Value }
foreach ($i in $imps) {
  if (-not (Test-Path (Join-Path 'src' $i))) { Falha "events.data.ts importa @/$i, que não existe" }
}
Ok "$($imps.Count) imports conferidos"

# 8 ---------------------------------------------------------------------------
Etapa '8' 'Referências relativas dos sites estáticos (eventos-vivos)' 'src/href e caminhos "./assets/..." em HTML/JS apontam para arquivos que existem (só AVISO)'
$base = 'public\eventos-vivos'
Get-ChildItem $base -Recurse -Include *.html, *.js | ForEach-Object {
  $arq = $_
  $txt = Get-Content $arq.FullName -Raw -Encoding UTF8
  $achados = @()
  $achados += [regex]::Matches($txt, '(?:src|href)="([^"#:?$]+)"') | ForEach-Object { $_.Groups[1].Value }
  $achados += [regex]::Matches($txt, '"(\./assets/[^"]+)"')        | ForEach-Object { $_.Groups[1].Value }
  foreach ($ref in ($achados | Sort-Object -Unique)) {
    if ($ref.StartsWith('/') -or $ref.StartsWith('&')) { continue }
    $alvo = Join-Path $arq.DirectoryName $ref
    if (-not (Test-Path $alvo)) { Aviso "$($arq.FullName.Substring((Get-Location).Path.Length + 1)) -> $ref não existe" }
  }
}
if ($script:avisos -eq 0) { Ok 'todas as referências existem' }

Write-Host ''
Write-Host "Verificação concluída. Avisos: $($script:avisos)." -ForegroundColor Green
Write-Host 'Não coberto aqui: testes automatizados (o projeto ainda não tem), links externos e comportamento visual — ver docs\claudeia\05-testes-manuais.md'
exit 0
