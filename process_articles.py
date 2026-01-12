#!/usr/bin/env python3
"""
Article Processing Script for Swagwise Content Hub
Processes markdown articles, extracts metadata, adds frontmatter, and organizes into proper structure.
"""

import os
import re
import json
from datetime import datetime

# Directories
SOURCE_DIR = "/mnt/user-data/outputs"
DEST_DIR = "/home/claude/swagwise-content-hub/content"
PILLARS_DIR = os.path.join(DEST_DIR, "pillars")
CLUSTERS_DIR = os.path.join(DEST_DIR, "clusters")

# Pillar mapping
PILLAR_INFO = {
    1: {"name": "Science of Style DNA", "slug": "science-of-style-dna", "category": "Style Foundation"},
    2: {"name": "Psychology of Getting Dressed", "slug": "psychology-of-getting-dressed", "category": "Style Psychology"},
    3: {"name": "Digital Wardrobe Revolution", "slug": "digital-wardrobe-revolution", "category": "Wardrobe Technology"},
    4: {"name": "AI Fashion Technology", "slug": "ai-fashion-technology", "category": "Fashion Tech"},
    5: {"name": "Capsule Wardrobe Mastery", "slug": "capsule-wardrobe-mastery", "category": "Capsule Wardrobes"},
    6: {"name": "Fashion Confidence Complete Guide", "slug": "fashion-confidence-guide", "category": "Style Confidence"},
    7: {"name": "Sustainable Fashion", "slug": "sustainable-fashion", "category": "Sustainable Fashion"},
    8: {"name": "Wardrobe Economics", "slug": "wardrobe-economics", "category": "Wardrobe Economics"},
    9: {"name": "Body Type and Fit", "slug": "body-type-and-fit", "category": "Body Type & Fit"},
    10: {"name": "Professional and Occasion Dressing", "slug": "professional-occasion-dressing", "category": "Professional Dressing"},
    11: {"name": "Color Theory for Your Wardrobe", "slug": "color-theory-wardrobe", "category": "Color Theory"}
}

def extract_title(content):
    match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    return match.group(1).strip() if match else "Untitled Article"

def extract_description(content):
    meta_match = re.search(r'\*\*Meta Description:\*\*\s*(.+?)(?:\n|$)', content)
    if meta_match:
        return meta_match.group(1).strip()[:160]
    lines = content.split('\n')
    in_content = False
    for line in lines:
        if line.startswith('# '):
            in_content = True
            continue
        if in_content and line.strip() and not line.startswith('#') and not line.startswith('*') and not line.startswith('-'):
            desc = re.sub(r'\*\*([^*]+)\*\*', r'\1', line)
            desc = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', desc)
            return desc[:160].strip()
    return "Swagwise data-driven fashion intelligence guide."

def extract_keywords(content, title):
    kw_match = re.search(r'\*\*Keywords:\*\*\s*(.+?)(?:\n|$)', content)
    if kw_match:
        keywords = kw_match.group(1).strip()
        return [k.strip() for k in keywords.split(',')][:5]
    words = title.lower().replace(':', '').replace('|', '').split()
    return [w for w in words if len(w) > 3 and w not in ['the', 'and', 'for', 'how', 'what', 'your', 'with', 'that', 'this', 'guide', 'complete']][:5]

def extract_read_time(content):
    words = len(content.split())
    return f"{max(1, round(words / 200))} min read"

def generate_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug).strip('-')
    return slug[:60].rsplit('-', 1)[0] if len(slug) > 60 else slug

def determine_pillar_number(filename):
    match = re.search(r'p(\d+)_', filename)
    if match: return int(match.group(1))
    match = re.search(r'pillar(\d+)', filename)
    if match: return int(match.group(1))
    if re.search(r'^cluster(\d+)_', filename): return 2
    return None

def is_pillar_article(filename):
    return 'pillar' in filename.lower() and 'cluster' not in filename.lower()

def clean_content(content):
    # Remove old metadata blocks
    content = re.sub(r'\n---\n\n\*\*Metadata:\*\*[\s\S]*$', '', content)
    content = re.sub(r'\n\*Related Articles:\*[\s\S]*?(?=\n---|\Z)', '', content)
    return content.strip()

def process_article(filepath):
    filename = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if content.startswith('---'):
        return None  # Skip if already has frontmatter
    
    title = extract_title(content)
    description = extract_description(content)
    keywords = extract_keywords(content, title)
    read_time = extract_read_time(content)
    slug = generate_slug(title)
    is_pillar = is_pillar_article(filename)
    pillar_num = determine_pillar_number(filename)
    pillar_info = PILLAR_INFO.get(pillar_num, {"name": "Style Guide", "slug": "", "category": "Style Tips"})
    
    # Build frontmatter
    fm = ['---']
    fm.append(f'title: "{title}"')
    fm.append(f'description: "{description}"')
    fm.append(f'slug: "{slug}"')
    fm.append(f'date: "2025-01-12"')
    fm.append(f'author: "Swagwise Team"')
    fm.append(f'category: "{pillar_info["category"]}"')
    if not is_pillar and pillar_info["slug"]:
        fm.append(f'pillar: "{pillar_info["slug"]}"')
    fm.append(f'keywords: {json.dumps(keywords)}')
    fm.append(f'readTime: "{read_time}"')
    fm.append('---')
    fm.append('')
    
    clean = clean_content(content)
    new_content = '\n'.join(fm) + clean
    
    return {
        "content": new_content,
        "slug": slug,
        "is_pillar": is_pillar,
        "pillar_num": pillar_num,
        "filename": filename,
        "title": title
    }

def main():
    print("=" * 60)
    print("Swagwise Article Processing Script")
    print("=" * 60)
    
    os.makedirs(PILLARS_DIR, exist_ok=True)
    os.makedirs(CLUSTERS_DIR, exist_ok=True)
    
    md_files = [f for f in os.listdir(SOURCE_DIR) if f.endswith('.md')]
    print(f"\nFound {len(md_files)} markdown files")
    
    # Track duplicates
    seen_slugs = set()
    pillars = []
    clusters = []
    
    for filename in sorted(md_files):
        filepath = os.path.join(SOURCE_DIR, filename)
        print(f"\nProcessing: {filename}")
        
        result = process_article(filepath)
        if not result:
            print(f"  Skipped (has frontmatter)")
            continue
        
        # Handle duplicate slugs
        slug = result["slug"]
        if slug in seen_slugs:
            slug = f"{slug}-{result['pillar_num'] or 'alt'}"
            result["slug"] = slug
            result["content"] = result["content"].replace(f'slug: "{result["slug"]}"', f'slug: "{slug}"', 1)
        seen_slugs.add(slug)
        
        # Save to appropriate directory
        if result["is_pillar"]:
            dest_path = os.path.join(PILLARS_DIR, f"{slug}.md")
            pillars.append(result)
        else:
            dest_path = os.path.join(CLUSTERS_DIR, f"{slug}.md")
            clusters.append(result)
        
        with open(dest_path, 'w', encoding='utf-8') as f:
            f.write(result["content"])
        
        print(f"  -> Saved: {os.path.basename(dest_path)}")
        print(f"     Title: {result['title'][:50]}...")
    
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Pillars processed: {len(pillars)}")
    print(f"Clusters processed: {len(clusters)}")
    print(f"Total articles: {len(pillars) + len(clusters)}")
    print(f"\nPillars saved to: {PILLARS_DIR}")
    print(f"Clusters saved to: {CLUSTERS_DIR}")

if __name__ == "__main__":
    main()
