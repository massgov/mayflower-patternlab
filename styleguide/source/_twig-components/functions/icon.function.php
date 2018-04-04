<?php
$function = new Twig_SimpleFunction('icon', function($name) {
  // Note: Temporary BC layer for turning icon twig files into direct
  // filename references. This exists only so we don't break anything
  // terribly while working this function into general use. Going forward,
  // the string name of the icon should be passed to this function directly.
  if(strpos($name, '@') === 0) {
    $iconname = pathinfo($name, PATHINFO_FILENAME);
    $name = preg_replace('/^svg-/', '', $iconname);
  }
  $path = sprintf('%s/../../assets/images/svg-icons/%s.svg', __DIR__, $name);
  return file_get_contents($path);
}, [
  'is_safe' => ['html']
]);
