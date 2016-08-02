<?php get_header(); ?>
	<div id="Articles">
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<?php $cat_name = get_the_category(); ?>
		<article class="post <?= $cat_name[0]->cat_name; ?>">
			<div class="content">
				<a class="featured" href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
				<a href="<?php the_permalink(); ?>" class="title"><h2><?php the_title() ?></h2></a>
				<?php
					$content = get_the_content();
					if(strlen($content) < 301)
					{
						the_content();
					}
					else
					{
						the_excerpt();
					}
				?>
				<p>Posted on: <?= get_the_date('Y-m-d');?></p>
			</div>
			<div class="clear"></div>
			<? if (($wp_query->current_post +1) != ($wp_query->post_count)) {?>
			<div class="article_break"></div>
			<?}?>
			</article>
			<?php endwhile; else: ?>
				<h3 style="text-align:center;"><?php _e('Coming Soon!'); ?></h3>
			<?php endif; ?>
		</div>
		<div id="Sidebar">
			<? dynamic_sidebar('homepage_sidebar'); ?>
		</div>
		<div class="clear"></div>

<?php get_footer(); ?>