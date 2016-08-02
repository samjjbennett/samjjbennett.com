<?php
remove_action( 'wp_head', 'feed_links_extra'); // Display the links to the extra feeds such as category feeds
remove_action( 'wp_head', 'feed_links'); // Display the links to the general feeds: Post and Comment Feed
remove_action( 'wp_head', 'rsd_link'); // Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action( 'wp_head', 'wlwmanifest_link' ); // Display the link to the Windows Live Writer manifest file.
remove_action( 'wp_head', 'index_rel_link' ); // index link
remove_action( 'wp_head', 'parent_post_rel_link', 10); // prev link
remove_action( 'wp_head', 'start_post_rel_link', 10); // start link
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10); // Display relational links for the posts adjacent to the current post.
remove_action( 'wp_head', 'wp_generator'); // Display the XHTML generator that is generated on the wp_head hook, WP version

/**
 * Enqueue Styles & Scripts Properly
 */
if (!is_admin()) add_action("wp_enqueue_scripts", "my_custom_enqueue", 11);
function my_custom_enqueue() {
	wp_enqueue_style( 'custom', get_stylesheet_uri() );
	wp_deregister_script('jquery');
	wp_register_script('jquery', "http" . ($_SERVER['SERVER_PORT'] == 443 ? "s" : "") . "://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js", false, null);
	wp_enqueue_script('jquery');
}

/* Clean Up the WP Dashboard */
add_action( 'wp_dashboard_setup', 'clean_up_the_dashboard' );
function clean_up_the_dashbaord() {
	remove_meta_box('dashboard_plugins', 'dashboard', 'normal');    // Plugins
	remove_meta_box('dashboard_quick_press', 'dashboard', 'side');  // Quick Press
	remove_meta_box('dashboard_primary', 'dashboard', 'side');      // WordPress blog
	remove_meta_box('dashboard_secondary', 'dashboard', 'side');    // Other WordPress News
}

/* Clean Up the WP Dashboard (Continued) */
add_action('wp_dashboard_setup', 'clean_up_the_dashboard' );
function clean_up_the_dashboard() {
    global $wp_meta_boxes;
    /* unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']); */        // QuickPress
    /* unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']); */   // Incoming Links
    /* unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']); */        // Right Now
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);          // Plugins
    /* unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_drafts']); */    // Recen Drafts
    /* unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']); */  // Recent Comments
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);            // WordPress Blog
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);          // Other WordPress News
}


/* Register Available Menu Locations */
add_action( 'init', 'register_my_menus' );
function register_my_menus() {
  register_nav_menus(
    array(
      'main-menu' => __( 'Main Menu' )
    )
  );
}


/* Add Theme Sidebar Areas */
if ( function_exists('register_sidebar') ) {	
	register_sidebar(array(
	'name' => 'Homepage Sidebar',
	'id' => 'homepage_sidebar',
	'before_widget' => '<aside id="%1$s" class="widget %2$s">',
	'after_widget' => '</aside>',
	'before_title' => '<h1 class="page-title">',
	'after_title' => '</h1>'
	));
}

/* Add Post Thumbnail Support */
add_theme_support( 'post-thumbnails' );

function new_excerpt_more( $more ) {
	return '...<a class="read-more" href="' . get_permalink( get_the_ID() ) . '"><h5>' . __( 'Read More &raquo;', 'your-text-domain' ) . '</h5></a>';
}
add_filter( 'excerpt_more', 'new_excerpt_more' );

?>