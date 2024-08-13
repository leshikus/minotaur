#!/bin/perl

undef $/;
$_ = <>;

s/<div[^>]*?>//gs;
s/<\/div>//g;

s/<span[^>]*>//gs;
s/<\/span>//g;


s/<p\s[^>]*>/<p align="justify">/gs;

print;

