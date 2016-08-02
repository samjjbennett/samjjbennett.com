<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="" />
<title><?php wp_title(); ?></title>
<meta name="description" content="" />
<meta name="keywords" content="" />
<?php wp_head(); ?>
<script src="<?php bloginfo('template_url'); ?>/lib/main.js" type="text/javascript" charset="utf-8"></script>
<link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
</head>

<body>
	<div id="Container">
		<header>
			<div id="Headshot">
			<img src="<?php bloginfo('template_url'); ?>/headshot.jpg">
			</div>
			<div id="Title">
				<h1><?php echo bloginfo( 'name' ); ?></h1>
				<h3><?php echo bloginfo( 'description' ); ?></h3>
				<nav>
					<?php wp_nav_menu(array('menu'=>'Main Menu', 'link_before'=>'<h3>', 'link_after'=>'</h3>')); ?>
				</nav>
			</div>
			<div class="clear"></div>		

		</header>