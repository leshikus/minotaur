#!/bin/perl

use strict;
use File::Find;
use FindBin qw($Bin);

undef $/;

sub update {
    /^150$/ and $File::Find::prune = 1;
    /\.html?$/ or return;

    open(FILE, "< $_") or die "Cannot open $File::Find::name\n";
    my ($file, $output) = (<FILE>, '');
    close(FILE);
    if ($file !~ /^(.*<!-- #BeginTemplate "((?:\w|\.)*)" -->)(.*)(<!-- #EndTemplate -->.*)$/s) {
        return;
    }
    open(TEMPLATE, "< $2") or die "Cannot open template $1\n";
    my ($template, @out) = (<TEMPLATE>, ());
    close TEMPLATE;

    my ($output, $body, $tail) = ($1, $3, $4);

    $template =~ /(\s*<head>\s*)/g; # position a marker
    $output .= $1;

    while (1) {
        $template =~
            /(.*?)(?:(<!-- #BeginEditable "(\w+)"\ -->)|(<\/body>\s*))/gs or
                die "BeginEditable or /body tags missed";
        if ($4) {
            $tail = $1 . $4 . $tail;
            last;
        }
        push @out, $1 . $2, $3;
        $template =~ /(.*?)(?=<!-- #EndEditable -->)/gs or
             die "EndEditable missed";
        push @out, $1;
    }

    while (scalar @out) {
        $output .= shift @out;
        my ($name, $content) = (shift @out, shift @out);
        if ($body =~
            /<!-- #BeginEditable "$name" -->(.*?)<!-- #EndEditable -->/s) {
            $content = $1;
        }
        $output .= $content;
    }

    $output .= $tail;
    if ($file eq $output) {
        return;
    }
    open(FILE, "> $_.new") or die "Cannot open $File::Find::name.new\n";
    print FILE $output;
    close(FILE);
    print "diff -wu $File::Find::name $File::Find::name.new\n";
}

@ARGV = ($Bin) unless @ARGV;
find(\&update, @ARGV);

