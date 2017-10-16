<?php

$SITE_ROOT = "http://geekmox.com/";
$JSON_DEFAULT = "error404";
$jsonData = getData($SITE_ROOT);
makePage($jsonData, $SITE_ROOT);

function getData($siteRoot){
    global $JSON_DEFAULT;

    $id = $_GET['id'];
    if(!preg_match('/\A[-._a-z0-9]+\z/i',$id)){
        $id = $JSON_DEFAULT;
    }
    $rawData = file_get_contents($siteRoot.'json/news/'.$id.'.json');
    return json_decode($rawData);
}

function makePage($data, $siteRoot){
    $pageUrl = $siteRoot.'news/'.$data->id;
    ?>
    <!doctype html>
    <html lang="es-DO" dir="ltr" prefix="og: http://ogp.me/ns# article: http://ogp.me/ns/article#">
        <head>
            <meta charset="UTF-8">
            <meta name="referrer" content="origin">
            <meta name="robots" content="index, follow, notranslate">
            <meta property="fb:app_id" content="580965375393121">
            <link rel="canonical" href="<?php echo $pageUrl; ?>">
            <title><?php echo htmlentities($data->title, ENT_QUOTES | ENT_HTML401); ?></title>
            <meta name="description" content="<?php echo htmlentities($data->description, ENT_QUOTES | ENT_HTML401); ?>">
            <!-- Twitter card metadata -->
            <meta property="twitter:card" content="summary_large_image">
            <meta property="twitter:site" content="@geekmox">
            <meta property="twitter:title" content="<?php echo htmlentities($data->title, ENT_QUOTES | ENT_HTML401); ?>">
            <meta property="twitter:description" content="<?php echo htmlentities($data->description, ENT_QUOTES | ENT_HTML401); ?>">
            <meta property="twitter:image" content="<?php echo $data->images[0]; ?>">
            <meta property="twitter:url" content="<?php echo $pageUrl; ?>">
            <!-- Open graph metadata -->
            <meta property="og:site_name" content="geekmox.com">
            <meta property="og:title" content="<?php echo htmlentities($data->title, ENT_QUOTES | ENT_HTML401); ?>">
            <meta itemprop="og:headline" content="<?php echo htmlentities($data->title, ENT_QUOTES | ENT_HTML401); ?>">
            <meta property="og:description" content="<?php echo htmlentities($data->description, ENT_QUOTES | ENT_HTML401); ?>">
            <meta itemprop="og:description" content="<?php echo htmlentities($data->description, ENT_QUOTES | ENT_HTML401); ?>">
            <meta property="og:image" content="<?php echo $data->images[0]; ?>">
            <meta property="og:type" content="article">
            <meta property="og:url" content="<?php echo $pageUrl; ?>">
        </head>
    </html>
<?php
}
?>
