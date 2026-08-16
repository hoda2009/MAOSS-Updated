Add-Type -AssemblyName System.Drawing
$src = 'c:\Users\USER-13\Desktop\Dev\MAOSS\assets\MAOSS-logo.png'
$dst = 'c:\Users\USER-13\Desktop\Dev\MAOSS\assets\MAOSS-logo-circle.png'

$img = [System.Drawing.Bitmap]::FromFile($src)
# Crop to content bbox
$cropX = 72; $cropY = 7; $cropW = 591; $cropH = 593
$side = 600
$out = New-Object System.Drawing.Bitmap($side, $side)
$g = [System.Drawing.Graphics]::FromImage($out)
$g.Clear([System.Drawing.Color]::Transparent)

$cx = $side / 2.0
$cy = $side / 2.0
$radius = $side / 2.0 - 2

for ($y = 0; $y -lt $side; $y++) {
  for ($x = 0; $x -lt $side; $x++) {
    $sx = $cropX + [int](($x / $side) * $cropW)
    $sy = $cropY + [int](($y / $side) * $cropH)
    if ($sx -ge $cropX -and $sx -lt ($cropX + $cropW) -and $sy -ge $cropY -and $sy -lt ($cropY + $cropH)) {
      $p = $img.GetPixel($sx, $sy)
      $dx = $x - $cx
      $dy = $y - $cy
      $dist = [Math]::Sqrt($dx*$dx + $dy*$dy)
      if ($dist -le $radius) {
        # make near-white transparent
        if ($p.R -ge 245 -and $p.G -ge 245 -and $p.B -ge 245) {
          $out.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        } else {
          $out.SetPixel($x, $y, $p)
        }
      } else {
        $out.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
      }
    } else {
      $out.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
    }
  }
}
$out.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host ("Saved: " + $dst)
$g.Dispose()
$out.Dispose()
$img.Dispose()
