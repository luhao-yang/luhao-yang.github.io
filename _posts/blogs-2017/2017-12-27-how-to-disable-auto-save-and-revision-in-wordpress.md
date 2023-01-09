---
id: 107
title: How to disable auto-save and revision in WordPress?
#date: 2017-12-27T14:07:37+00:00
author: Luhao
summary: |
  I just don't like "Autosave" and "Revison" feature of Wordpress, So do you? Let's kick them out of our website!
layout: post
#guid: http://flywithfan.net/?p=107
#permalink: /misc/107/
categories:
  - Web
tags:
  - wordpress
---
Sometimes the auto-save and revison function of WordPress really annoyed me, because they make a lot &#8220;trash&#8221; in database and result in incontinuous post ID.

I found a way to disable them, just write down before I forgot.

1.Edit the **wp-config.php** in root directory.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-php">//disable autosave and revision
define( 'AUTOSAVE_INTERVAL', false );
define( 'WP_POST_REVISIONS', false );
</code></pre>

2.Edit the **functions.php** in current theme.

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-php">//remove autosave in action
function disable_autosave() {
  wp_deregister_script('autosave');
}
add_action('wp_print_scripts','disable_autosave' );
remove_action('pre_post_update','wp_save_post_revision' );
</code></pre>

3.Edit wp-admin/includes/post.php
  
**_LOGIC: if there is a autodraft in database, then use it otherwise create a new one_**

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-php">// before
if ( $create_in_db ) {
  $post_id = wp_insert_post( array( 'post_title' =&gt; __( 'Auto Draft' ), 'post_type' =&gt; $post_type, 'post_status' =&gt; 'auto-draft' ) );
  $post = get_post( $post_id );
  if ( current_theme_supports( 'post-formats' ) && post_type_supports( $post-&gt;post_type, 'post-formats' ) && get_option( 'default_post_format' ) )
    set_post_format( $post, get_option( 'default_post_format' ) );
}

//=&gt;after
if ( $create_in_db ) {
  global $wpdb;
  global $current_user;
  $post = $wpdb-&gt;get_row( "SELECT * FROM {$wpdb-&gt;posts} WHERE {$wpdb-&gt;posts}.post_status = 'auto-draft' AND {$wpdb-&gt;posts}.post_type = '$post_type' AND {$wpdb-&gt;posts}.post_author = {$current_user-&gt;ID} ORDER BY {$wpdb-&gt;posts}.ID ASC LIMIT 1" );  //get autodraft
  if ( !$post ) { // if no autodraft, create one
    $post_id = wp_insert_post( array( 'post_title' =&gt; __( 'Auto Draft' ), 'post_type' =&gt; $post_type, 'post_status' =&gt; 'auto-draft' ) );
    $post = get_post( $post_id );
  }
  if ( current_theme_supports( 'post-formats' ) && post_type_supports( $post-&gt;post_type, 'post-formats' ) && get_option( 'default_post_format' ) )
    set_post_format( $post, get_option( 'default_post_format' ) );
}
</code></pre>

Further clean in database:
  
login your phpmyadmin, find you wordpress databse, go to posts table, then input this sql and execute:

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-sql">DELETE FROM wp_posts where id in (
    SELECT id from (SELECT id FROM wp_posts where post_name like '%revision%') tmp
);
</code></pre>

PS: tmp is just a temp table.

> In MySQL, you cannot modify a table and select from the same table in a subquery. This applies to statements such as DELETE, INSERT, REPLACE, UPDATE, and (because subqueries can be used in the SET clause) LOAD DATA INFILE. 

So this is **WRONG**, just remind

<pre class="line-numbers prism-highlight" data-start="1"><code class="language-sql">DELETE FROM wp_posts where id in (SELECT id FROM wp_posts where post_name like '%revision%');
</code></pre>