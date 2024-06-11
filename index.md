---
title: "My GitHub Page"
---

<link rel="stylesheet" type="text/css" href="styles.css">

# My Code Example
	
## Client

<pre class="client"><code class="language-ocaml">
module Raw : 
  Html_sigs.Make(Xml)(Svg.D.Raw).T
        with type +'a elt = 'a elt
         and type +'a attrib = 'a attrib
</code></pre>

## Server

<pre class="server"><code class="language-ocaml">
module Raw : 
  Html_sigs.Make(Xml)(Svg.D.Raw).T
        with type +'a elt = 'a elt
         and type +'a attrib = 'a attrib
</code></pre>

## Shared

<pre class="shared"><code class="language-ocaml">
let x = foo;;
</code></pre>
