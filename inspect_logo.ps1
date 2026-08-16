Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile('c:\Users\USER-13\Desktop\Dev\MAOSS\assets\MAOSS-logo.png')
$w = $img.Width
$h = $img.Height
$minX = $w; $minY = $h; $maxX = -1; $maxY = -1

for ($x = 0; $x -lt $w; $x++) {
  for ($y = 0; $y -lt $h; $y++) {
    $p = $img.GetPixel($x, $y)
    # treat near-white as background
    if ($p.R -lt 240 -or $p.G -lt 240 -or $p.B -lt 240) {
      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}
Write-Host ("Size: " + $w + " x " + $h)
Write-Host ("Content bbox: x=[" + $minX + "," + $maxX + "] y=[" + $minY + "," + $maxY + "]")
Write-Host ("Content w=" + ($maxX-$minX+1) + " h=" + ($maxY-$minY+1))
$img.Dispose()
