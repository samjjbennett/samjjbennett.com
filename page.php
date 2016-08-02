<?php get_header(); ?>

	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<?php $cat_name = get_the_category(); ?>
	<section>
		<a class="featured" style="float:left;" href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
		<div class="content">
			<a href="<?php the_permalink(); ?>"><h2><?php the_title() ?></h2></a>
			<div class="addcart">
				<p class="price">
					<?php echo get_post_meta( get_the_ID(), 'price', true);?><span class="sale"><?php echo get_post_meta( get_the_ID(), 'sale', true);?></span>
				</p><?php echo get_post_meta( get_the_ID(), 'cart', true);?>
			</div>
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