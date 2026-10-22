#!/usr/bin/env python3
"""
Master Banner & Cover Photo Generator for Upper Layer Studio®
Generates pixel-perfect social covers for:
  - X / Twitter (1500x500 + @2x 3000x1000)
  - LinkedIn Personal Profile (1584x396 + @2x 3168x792)
  - LinkedIn Company Page (1128x191 + @2x 2256x382)
  - Contra (1200x360 + @2x 2400x720)
  - YouTube Channel Banner (2560x1440 with safe zone 1235x338 + @2x 5120x2880)

Aesthetic: Signature Sky & Cloud (elevated, minimalist, classic luxury)
Typography: Helvetica Neue Bold & Medium with optical negative tracking
Branding: Upper Layer Studio circular badge with crisp white background & defined border + 4 Service Pillars + URL
"""

import os
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FONT_PATH = "/System/Library/Fonts/HelveticaNeue.ttc"
PHOTO_SOURCE = "public/hero/hero-option-3-rolling-hills.jpg"
FALLBACK_PHOTO = "public/hero/hero-option-3-rolling-hills.jpg"
BADGE_SOURCE = "public/brand/upper_layer_studio_logo_badge.png"
OUTPUT_DIR = "public/brand/covers"
EXPORT_DIR = "cover latter"

# Brand Copy
LINE_1 = "Automate the slow work"
LINE_2 = "Then own the software"
PILL_TEXT = "AI Automation · Voice AI · AI Agents · Product Build"
DOMAIN_TEXT = "upperlayerstudio.com"

# Brand Colors (Aligned with Option 3 & Celestial Glass look)
COLOR_WHITE = (255, 255, 255, 255)
COLOR_CRYSTAL_BLUE = (186, 230, 253, 255)  # #bae6fd signature glassy crystal blue
COLOR_INK = (10, 15, 22, 240)
SHADOW_COLOR = (0, 20, 45, 120)

_GLYPH_CACHE = None

def get_font(size, weight="bold"):
    idx = 1 if weight == "bold" else (10 if weight == "medium" else 0)
    return ImageFont.truetype(FONT_PATH, size, index=idx)

def get_isolated_glyph():
    """Extracts the dark 'U' glyph with smooth alpha transparency."""
    global _GLYPH_CACHE
    if _GLYPH_CACHE is not None:
        return _GLYPH_CACHE
        
    badge = Image.open(BADGE_SOURCE).convert("RGBA")
    glyph_crop = badge.crop((260, 260, 764, 764))
    gw, gh = glyph_crop.size
    
    glyph_rgba = glyph_crop.copy()
    pix = glyph_rgba.load()
    for y in range(gh):
        for x in range(gw):
            r, g, b, a = pix[x, y]
            luminance = 0.299 * r + 0.587 * g + 0.114 * b
            if luminance > 240:
                pix[x, y] = (0, 0, 0, 0)
            else:
                alpha = int(255 * (1.0 - (luminance / 240.0)))
                pix[x, y] = (r, g, b, alpha)
                
    _GLYPH_CACHE = glyph_rgba
    return _GLYPH_CACHE

def create_circular_logo_badge(size):
    """
    Renders the iconic Upper Layer Studio circular logo badge:
      - Solid pure white circular background
      - Defined circular border and soft ambient depth shadow
      - Perfectly centered black 'U' glyph with generous white breathing room
    """
    scale = 4
    s = size * scale
    glyph = get_isolated_glyph()
    
    badge = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    draw = ImageDraw.Draw(badge)
    
    margin = int(1.5 * scale)
    r = (s - 2 * margin) // 2
    cx, cy = s // 2, s // 2
    
    # 1. Ambient drop shadow for tactile depth
    shadow = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.ellipse(
        [cx - r, cy - r + int(1 * scale), cx + r, cy + r + int(1 * scale)],
        fill=(0, 25, 50, 60)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=int(1.2 * scale)))
    badge.paste(shadow, (0, 0), mask=shadow)
    
    # 2. Solid pure white circular disc
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 255, 255, 255))
    
    # 3. Crisp circular border (outer white + defined subtle bevel ring)
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(255, 255, 255, 255), width=int(1.5 * scale))
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(210, 225, 238, 180), width=int(1 * scale))
    
    # 4. Glyph centered with ~54% diameter so white background is clearly visible
    glyph_size = int(r * 2 * 0.54)
    glyph_resized = glyph.resize((glyph_size, glyph_size), Image.Resampling.LANCZOS)
    gx = cx - glyph_size // 2
    gy = cy - glyph_size // 2
    badge.paste(glyph_resized, (gx, gy), mask=glyph_resized)
    
    return badge.resize((size, size), Image.Resampling.LANCZOS)

def add_film_grain(img, intensity=4):
    """Subtle analog film grain for a classic, tactile finish."""
    w, h = img.size
    random.seed(42)
    noise_bytes = bytearray(random.getrandbits(8) for _ in range(w * h))
    grain = Image.new("L", (w, h))
    grain.frombytes(bytes(noise_bytes))
    
    rgb_img = img.convert("RGB")
    pixels = rgb_img.load()
    g_pix = grain.load()
    
    for y in range(h):
        for x in range(w):
            val = g_pix[x, y]
            delta = int((val - 128) * (intensity / 128.0))
            r, g, b = pixels[x, y]
            pixels[x, y] = (
                max(0, min(255, r + delta)),
                max(0, min(255, g + delta)),
                max(0, min(255, b + delta))
            )
    return rgb_img

def render_frosted_pill(text, height, font_size, logo_size):
    """Renders frosted glass pill capsule with circular badge and text."""
    font = get_font(font_size, "medium")
    tracking = -0.4
    char_widths = [font.getlength(c) + tracking for c in text]
    text_w = int(sum(char_widths) - tracking)
    pad_x = int(height * 0.45)
    logo_w = logo_size + int(height * 0.28)
    total_w = pad_x * 2 + logo_w + text_w
    radius = height // 2
    
    ss = 2  # Internal 2x supersampling
    pill_img = Image.new("RGBA", (total_w * ss, height * ss), (0, 0, 0, 0))
    draw = ImageDraw.Draw(pill_img)
    
    # Frosted glass background
    draw.rounded_rectangle([0, 0, total_w * ss - 1, height * ss - 1], radius=radius * ss, fill=(255, 255, 255, 52))
    # Crisp hairline border
    draw.rounded_rectangle([0, 0, total_w * ss - 1, height * ss - 1], radius=radius * ss, outline=(255, 255, 255, 125), width=max(1, int(1.2 * ss)))
    
    # Add circular logo badge
    logo = create_circular_logo_badge(logo_size * ss)
    logo_y = (height * ss - logo_size * ss) // 2
    pill_img.paste(logo, (pad_x * ss, logo_y), mask=logo)
    
    # Text
    f_ss = get_font(font_size * ss, "medium")
    bbox = f_ss.getbbox("A")
    base_y = (height * ss - (bbox[3] - bbox[1])) // 2 - bbox[1]
    
    tx = (pad_x + logo_w) * ss
    for c in text:
        draw.text((tx, base_y + 1 * ss), c, font=f_ss, fill=(0, 20, 45, 60))
        draw.text((tx, base_y), c, font=f_ss, fill=(255, 255, 255, 245))
        tx += f_ss.getlength(c) + (tracking * ss)
        
    return pill_img.resize((total_w, height), Image.Resampling.LANCZOS)

def generate_banner(config):
    """Generates a single banner with exact layout specifications."""
    name = config["name"]
    target_w = config["width"]
    target_h = config["height"]
    layout = config.get("layout", "right") # "right" or "center"
    
    scale = 2  # Supersample 2x
    w = target_w * scale
    h = target_h * scale
    
    # Load source sky
    src_file = PHOTO_SOURCE if os.path.exists(PHOTO_SOURCE) else FALLBACK_PHOTO
    sky_src = Image.open(src_file)
    sw_src, sh_src = sky_src.size
    
    # YouTube uses full 16:9 canvas matching source
    if name == "youtube_banner":
        sky_crop = sky_src
    else:
        y_crop_start = config["y_crop_start"]
        y_crop_ratio = target_w / target_h
        crop_w = sw_src
        crop_h = int(crop_w / y_crop_ratio)
        if y_crop_start + crop_h > sh_src:
            y_crop_start = max(0, sh_src - crop_h)
        sky_crop = sky_src.crop((0, y_crop_start, crop_w, y_crop_start + crop_h))
        
    base = sky_crop.resize((w, h), Image.Resampling.LANCZOS).convert("RGBA")
    
    # Render typography and pill (pass dimensions scaled by `scale`)
    pill_h = config["pill_h"] * scale
    pill_fsize = config["pill_fsize"] * scale
    pill_logo = config["pill_logo"] * scale
    pill = render_frosted_pill(PILL_TEXT, pill_h, pill_fsize, pill_logo)
    
    head_size = config["head_size"] * scale
    head_font = get_font(head_size, "bold")
    tracking = config.get("tracking", -1.5) * scale
    
    def get_tracked_w(text):
        return sum(head_font.getlength(c) + tracking for c in text) - (tracking if text else 0)
    
    w1 = get_tracked_w(LINE_1)
    w2 = get_tracked_w(LINE_2)
    
    text_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw_t = ImageDraw.Draw(text_layer)
    
    right_margin = config.get("right_margin", 80) * scale
    top_y = config["top_y"] * scale
    line_spacing = config["line_spacing"] * scale
    
    if layout == "right":
        pill_x = w - right_margin - pill.width
        pill_y = top_y
        
        y1 = pill_y + pill.height + (config.get("pill_gap", 20) * scale)
        y2 = y1 + line_spacing
        
        x1 = w - right_margin - w1
        x2 = w - right_margin - w2
    else: # center
        pill_x = (w - pill.width) // 2
        pill_y = top_y
        
        y1 = pill_y + pill.height + (config.get("pill_gap", 24) * scale)
        y2 = y1 + line_spacing
        
        x1 = (w - w1) // 2
        x2 = (w - w2) // 2
        
    # Draw pill
    base.paste(pill, (pill_x, pill_y), mask=pill)
    
    # Draw headline on text_layer
    cx = x1
    for c in LINE_1:
        draw_t.text((cx, y1), c, font=head_font, fill=COLOR_WHITE)
        cx += head_font.getlength(c) + tracking
        
    cx = x2
    for c in LINE_2:
        draw_t.text((cx, y2), c, font=head_font, fill=COLOR_CRYSTAL_BLUE)
        cx += head_font.getlength(c) + tracking
        
    # Create soft shadow for text
    shadow_mask = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_mask)
    for (lx, ly, txt) in [(x1, y1, LINE_1), (x2, y2, LINE_2)]:
        cx = lx
        for c in txt:
            s_draw.text((cx, ly), c, font=head_font, fill=SHADOW_COLOR)
            cx += head_font.getlength(c) + tracking
    shadow = shadow_mask.filter(ImageFilter.GaussianBlur(radius=8 * scale))
    
    # Merge shadow and text
    comp_text = Image.alpha_composite(shadow, text_layer)
    base = Image.alpha_composite(base, comp_text)
    
    # Render Domain URL
    url_size = config.get("url_size", 20) * scale
    url_font = get_font(url_size, "bold")
    url_bbox = url_font.getbbox(DOMAIN_TEXT)
    url_w = url_bbox[2] - url_bbox[0]
    
    draw_base = ImageDraw.Draw(base)
    if layout == "right":
        url_x = w - right_margin - url_w
        url_y = h - (config.get("bottom_margin", 65) * scale)
        url_color = config.get("url_color", (255, 255, 255, 245))
        url_shadow = (0, 20, 45, 120)
        draw_base.text((url_x, url_y + 1 * scale), DOMAIN_TEXT, font=url_font, fill=url_shadow)
        draw_base.text((url_x, url_y), DOMAIN_TEXT, font=url_font, fill=url_color)
    else: # center
        url_x = (w - url_w) // 2
        url_y = int(config.get("url_y", (y2 + line_spacing + 16 * scale) / scale) * scale)
        url_color = (255, 255, 255, 240)
        draw_base.text((url_x, url_y + 1 * scale), DOMAIN_TEXT, font=url_font, fill=(0, 20, 45, 90))
        draw_base.text((url_x, url_y), DOMAIN_TEXT, font=url_font, fill=url_color)
        
    # Grain & Final Export
    img_2x = add_film_grain(base.convert("RGB"), intensity=config.get("grain", 4))
    img_1x = img_2x.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    out_1x = os.path.join(OUTPUT_DIR, f"{name}.png")
    out_2x = os.path.join(OUTPUT_DIR, f"{name}@2x.png")
    img_1x.save(out_1x, "PNG", optimize=True)
    img_2x.save(out_2x, "PNG", optimize=True)

    os.makedirs(EXPORT_DIR, exist_ok=True)
    exp_1x = os.path.join(EXPORT_DIR, f"{name}.png")
    exp_2x = os.path.join(EXPORT_DIR, f"{name}@2x.png")
    img_1x.save(exp_1x, "PNG", optimize=True)
    img_2x.save(exp_2x, "PNG", optimize=True)

    if name == "x_twitter_cover":
        img_1x.save("public/brand/x_cover_upper_layer.png", "PNG", optimize=True)

    print(f"Generated {out_1x} & {exp_1x} ({target_w}x{target_h})")
    return out_1x

def main():
    configs = [
        # 1. X / Twitter (1500 x 500)
        {
            "name": "x_twitter_cover",
            "width": 1500,
            "height": 500,
            "y_crop_start": 120,
            "pill_h": 38,
            "pill_fsize": 14,
            "pill_logo": 24,
            "pill_gap": 22,
            "head_size": 54,
            "line_spacing": 62,
            "top_y": 65,
            "right_margin": 80,
            "url_size": 20,
            "bottom_margin": 65,
            "layout": "right",
        },
        # 2. LinkedIn Personal Profile Banner (1584 x 396)
        {
            "name": "linkedin_profile_cover",
            "width": 1584,
            "height": 396,
            "y_crop_start": 260,
            "pill_h": 34,
            "pill_fsize": 13,
            "pill_logo": 22,
            "pill_gap": 18,
            "head_size": 45,
            "line_spacing": 51,
            "top_y": 45,
            "right_margin": 75,
            "url_size": 18,
            "bottom_margin": 45,
            "layout": "right",
        },
        # 3. LinkedIn Company Page Banner (1128 x 191)
        {
            "name": "linkedin_company_cover",
            "width": 1128,
            "height": 191,
            "y_crop_start": 540,
            "pill_h": 26,
            "pill_fsize": 10,
            "pill_logo": 16,
            "pill_gap": 12,
            "head_size": 26,
            "line_spacing": 30,
            "top_y": 18,
            "right_margin": 40,
            "url_size": 12,
            "bottom_margin": 18,
            "layout": "right",
        },
        # 4. Contra Cover Banner (1200 x 360)
        {
            "name": "contra_cover",
            "width": 1200,
            "height": 360,
            "y_crop_start": 180,
            "pill_h": 34,
            "pill_fsize": 13,
            "pill_logo": 22,
            "pill_gap": 18,
            "head_size": 43,
            "line_spacing": 49,
            "top_y": 45,
            "right_margin": 65,
            "url_size": 17,
            "bottom_margin": 45,
            "layout": "right",
        },
        # 5. YouTube Channel Banner (2560 x 1440)
        # Safe zone: 1235 x 338, centered at X: 1280, Y: 720 (Y: 551 to 889)
        {
            "name": "youtube_banner",
            "width": 2560,
            "height": 1440,
            "pill_h": 44,
            "pill_fsize": 16,
            "pill_logo": 26,
            "pill_gap": 20,
            "head_size": 58,
            "line_spacing": 68,
            "top_y": 552, # safely inside safe zone 551 to 889
            "url_size": 20,
            "url_y": 752,  # safely inside 889 and above green hill crest
            "layout": "center",
        },
    ]

    for cfg in configs:
        generate_banner(cfg)

if __name__ == "__main__":
    main()
