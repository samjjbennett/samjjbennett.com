<?php get_header(); ?>

	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<?php $cat_name = get_the_category(); ?>
	<section>
		<a href="<?php print $_SERVER['HTTP_REFERER'];?>">&laquo; Back</a>
		<div class="content">
			<a href="<?php the_permalink(); ?>"><h1><?php the_title() ?></h1></a>
			<p class="featured"><?php the_post_thumbnail(); ?></p>
			<?php
				the_content();
			?>
		</div>
		<div class="clear"></div>
		</section>
		<?php endwhile; else: ?>
			<h3 style="text-align:center;"><?php _e('Coming Soon!'); ?></h3>
		<?php endif; ?>

<?php get_footer(); ?>