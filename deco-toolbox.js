(function() {
    // 1. Array of all 116 base assets
    const baseAssets = [
        'agfa_film_box_57.png',
        'black-coffee-stain.png',
        'black-ink-blot.png',
        'black-ink-fingerprint-2.png',
        'black-ink-fingerprint-3.png',
        'black-ink-fingerprint.png',
        'black-ink-ring-2.png',
        'black-ink-ring.png',
        'black-ink-stain.png',
        'black-plastic-alarm-clock.png',
        'black-plastic-car-key.png',
        'black-plastic-walkman.png',
        'black_pen_42.png',
        'black_slate_rectangle_43.png',
        'blue-cardboard-film-box.png',
        'blue-metal-ipod.png',
        'bone-pocket-knife.png',
        'brass-hand-telescope.png',
        'brass-thimble-handle.png',
        'brown-coffee-stain-2.png',
        'brown-coffee-stain.png',
        'brown-ink-stain.png',
        'brown-leather-journal.png',
        'brown-stone-ammonite.png',
        'brown-watercolor-stain.png',
        'brown_button_40.png',
        'burn_mark_4.png',
        'bus_ticket_45.png',
        'button_2.png',
        'cardboard-matchbook-cover.png',
        'cardboard-matchbox-cover.png',
        'cassette_tape_13.png',
        'clear-plastic-cassette-tape.png',
        'coins_22.png',
        'coins_stack_50.png',
        'colorful-sticker-sheet.png',
        'compass_36.png',
        'cork_stopper_10.png',
        'dark_grey_watercolor_blot_14.png',
        'dark_ink_blot_3.png',
        'dice_4.png',
        'digital_watch_18.png',
        'dirty_smudge_6.png',
        'enamel-metal-trinket-box.png',
        'envelope_49.png',
        'fountain_pen_29.png',
        'fountain_pen_dark_54.png',
        'glass-saffron-jar.png',
        'green-raw-stone.png',
        'grey-crystal-geode.png',
        'grey-ink-fingerprint.png',
        'grey-plastic-gameboy.png',
        'grey-watercolor-splash.png',
        'multicolor-plastic-ballpoint-pen.png',
        'old_brass_key_30.png',
        'old_key_0.png',
        'old_photo_landscape_51.png',
        'oxo_cubes_tin_top_34.png',
        'paper-tarot-cards.png',
        'paper-tea-bag.png',
        'pencil_sharpener_6.png',
        'plastic-microcassette-tape.png',
        'red-silk-thread.png',
        'red-swiss-army-knife.png',
        'silver-metal-airplane.png',
        'silver-metal-lighter.png',
        'silver_pencil_sharpener_26.png',
        'single_coin_35.png',
        'single_coin_bottom_58.png',
        'small_brown_splatter_marks_5.png',
        'small_irregular_brown_stains_2.png',
        'stain-1_0000_Layer-6.png',
        'stain-1_0001_Layer-5.png',
        'stain-1_0002_Layer-4.png',
        'stain-1_0003_Layer-3.png',
        'stain-1_0004_Layer-2.png',
        'stain-1_0005_Layer-0.png',
        'steel-multitool-device.png',
        'tan-paper-ticket.png',
        'tea_bag_12.png',
        'two_coins_56.png',
        'vintage-brass-box.png',
        'vintage-img_0000_Layer-30.png',
        'vintage-img_0001_Layer-24.png',
        'vintage-img_0002_Layer-23.png',
        'vintage-img_0003_Layer-22.png',
        'vintage-img_0004_Layer-21.png',
        'vintage-img_0005_Layer-19.png',
        'vintage-img_0006_Layer-1.png',
        'vintage-img_0007_Layer-2.png',
        'vintage-img_0008_Layer-3.png',
        'vintage-img_0009_Layer-5.png',
        'vintage-img_0010_Layer-6.png',
        'vintage-img_0011_Layer-7.png',
        'vintage-img_0012_Layer-8.png',
        'vintage-img_0013_Layer-9.png',
        'vintage-img_0014_Layer-10.png',
        'vintage-img_0015_Layer-11.png',
        'vintage-img_0016_Layer-12.png',
        'vintage-img_0017_Layer-13.png',
        'vintage-img_0018_Layer-14.png',
        'vintage-img_0019_Layer-15.png',
        'vintage-img_0020_Layer-29.png',
        'vintage-img_0021_Layer-28.png',
        'vintage-img_0022_Layer-27.png',
        'vintage-img_0023_Layer-26.png',
        'vintage-img_0024_Layer-25.png',
        'vintage-img_0025_Layer-17.png',
        'vintage-img_0026_Layer-16.png',
        'vintage-img_0027_Layer-18.png',
        'wooden-box-of-buttons.png',
        'yellow-cardboard-film-box.png',
        'yellow-metal-tin.png',
        'yellow-plastic-floppy-disk.png',
        'yellow-plastic-walkman.png',
        'yellow_measuring_tape_41.png'
    ];

    const assetPool = [];
    baseAssets.forEach(base => {
        assetPool.push(base);
        assetPool.push(base.replace('.png', '_h.png'));
        assetPool.push(base.replace('.png', '_v.png'));
        assetPool.push(base.replace('.png', '_hv.png'));
    });

    // 2. State & Style Management (Fixed ReferenceError & dynamically load stylesheet with correct prefix)
    let assetPrefix = '../../assets/';
    let hoveredEl = null;
    let saveTimeout = null;
    let startBlowingRef = null;
    let stopBlowingRef = null;

    const detectPrefix = () => {
        const firstDeco = document.querySelector('.deco-img');
        if (firstDeco) {
            const src = firstDeco.getAttribute('src') || '';
            const idx = src.lastIndexOf('assets/');
            if (idx !== -1) {
                assetPrefix = src.substring(0, idx + 7);
                return;
            }
        }
        
        // Robust pathname fallback
        const path = window.location.pathname;
        if (path.includes('/sketches/html/') || path.includes('/sketches/p5js/')) {
            assetPrefix = '../../assets/';
        } else if (path.includes('/archive/')) {
            assetPrefix = '../assets/';
        } else {
            assetPrefix = 'assets/'; // homepage / root
        }
    };

    const injectStyles = () => {
        const styleEl = document.createElement('style');
        styleEl.innerHTML = `
            /* Interactive dragging states - Outlines completely removed */
            .deco-img {
                cursor: grab !important;
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease, filter 0.4s ease !important;
                outline: none !important;
                border: none !important;
                user-select: none !important;
                -webkit-user-select: none !important;
                -webkit-user-drag: none !important;
            }
            .deco-img:hover {
                cursor: grab !important;
            }
            .deco-img.dragging {
                cursor: grabbing !important;
                opacity: 0.95 !important;
                transition: none !important;
                outline: none !important;
                border: none !important;
            }

            /* Leaf Blower styles - fixed viewport container hidden in invisible frame */
            #leaf-blower-container {
                position: fixed;
                bottom: 0;
                right: 0;
                width: 400px;
                height: 400px;
                z-index: 1000000;
                pointer-events: auto;
                background: transparent;
                display: flex;
                align-items: flex-end;
                justify-content: flex-end;
                overflow: visible;
            }
            #leaf-blower {
                width: 340px;
                height: 340px;
                object-fit: contain;
                cursor: pointer;
                pointer-events: auto;
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                /* Slide-hidden off screen by default, rotated but slightly visible */
                transform: translate(170px, 170px) rotate(45deg);
                transform-origin: bottom right;
                outline: none !important;
                border: none !important;
                filter: drop-shadow(4px 4px 8px rgba(0,0,0,0.25));
            }
            #leaf-blower-container:hover #leaf-blower {
                /* Slide into view and rotate to active position */
                transform: translate(-20px, -20px) rotate(0deg);
                filter: drop-shadow(8px 16px 24px rgba(0,0,0,0.35));
            }
            #leaf-blower-container.dragging #leaf-blower {
                /* While grabbed, turn the landscape blower -90° so the nozzle points
                   straight up. After that turn the nozzle sits at the TOP-CENTRE of
                   the box, which the drag handler pins exactly onto the cursor.
                   Centre origin keeps it predictable; no transition so the nozzle
                   tracks the pointer frame-perfectly. */
                transform: rotate(-90deg) !important;
                transform-origin: center center !important;
                transition: none !important;
                filter: drop-shadow(8px 16px 24px rgba(0,0,0,0.35)) !important;
            }
            #leaf-blower-label {
                position: fixed;
                pointer-events: none;
                z-index: 1000001;
                background-image: url('${assetPrefix}PaperMix-Kraft-09-thumb.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                filter: grayscale(1) brightness(1.2) contrast(1.1);
                color: #131b23;
                padding: 8px 18px;
                font-family: 'Outfit', sans-serif;
                font-size: 0.85rem;
                font-weight: 600;
                box-shadow: 0 6px 15px rgba(0,0,0,0.25);
                display: none;
                white-space: nowrap;
                transform: translate(-50%, -140%) rotate(-2deg);
            }

            /* Drag Basket styles */
            #drag-basket-container {
                position: fixed;
                bottom: 30px;
                left: 30px;
                width: 220px;
                height: 220px;
                z-index: 1000000;
                pointer-events: none;
                opacity: 0;
                transform: translateY(50px) scale(0.9);
                transition: opacity 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                overflow: visible;
            }
            #drag-basket-container.show-basket {
                opacity: 1;
                transform: translateY(0) scale(1);
                pointer-events: auto;
            }
            #drag-basket-container.drag-over {
                transform: scale(1.18) translateY(-10px);
            }
            #drag-basket-img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                filter: drop-shadow(0px 8px 20px rgba(0,0,0,0.35));
                transition: transform 0.2s ease;
                position: relative !important;
                z-index: auto !important;
                pointer-events: none !important;
            }
            #drag-basket-label {
                position: absolute;
                bottom: -5px;
                background-image: url('${assetPrefix}PaperMix-Kraft-09-thumb.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                filter: grayscale(1) brightness(1.2) contrast(1.1);
                color: #131b23;
                padding: 8px 18px;
                font-family: 'Outfit', sans-serif;
                font-size: 0.85rem;
                font-weight: 600;
                box-shadow: 0 6px 15px rgba(0,0,0,0.25);
                white-space: nowrap;
                pointer-events: none;
                opacity: 0.9;
                transform: rotate(2deg);
                transition: transform 0.2s ease, filter 0.2s ease;
            }
            #drag-basket-container.drag-over #drag-basket-label {
                transform: scale(1.06) rotate(-1deg);
                filter: grayscale(0.2) brightness(1.22) contrast(1.15);
            }

            /* Always-active Rare Item Glows */
            .rare-item-glow-1 {
                filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.45));
                animation: rarePulse1 3.5s ease-in-out infinite alternate;
            }
            @keyframes rarePulse1 {
                0% { filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.2)); }
                100% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.55)); }
            }

            .rare-item-glow-2 {
                filter: drop-shadow(0 0 8px rgba(46, 204, 113, 0.75));
                animation: rarePulse2 2.8s ease-in-out infinite alternate;
            }
            @keyframes rarePulse2 {
                0% { filter: drop-shadow(0 0 3px rgba(46, 204, 113, 0.45)); }
                100% { filter: drop-shadow(0 0 12px rgba(46, 204, 113, 0.9)) drop-shadow(0 0 3px rgba(46, 204, 113, 0.4)); }
            }

            .rare-item-glow-3 {
                filter: drop-shadow(0 0 10px rgba(231, 76, 60, 0.85));
                animation: rarePulse3 2.2s ease-in-out infinite alternate;
            }
            @keyframes rarePulse3 {
                0% { filter: drop-shadow(0 0 4px rgba(231, 76, 60, 0.55)); }
                100% { filter: drop-shadow(0 0 18px rgba(231, 76, 60, 0.95)) drop-shadow(0 0 5px rgba(231, 76, 60, 0.5)); }
            }

            .rare-item-glow-4 {
                filter: drop-shadow(0 0 12px rgba(155, 89, 182, 0.8)) drop-shadow(0 0 4px rgba(142, 68, 173, 0.4));
                animation: rarePulse4 3.2s ease-in-out infinite alternate;
            }
            @keyframes rarePulse4 {
                0% { filter: drop-shadow(0 0 5px rgba(155, 89, 182, 0.5)) drop-shadow(0 0 2px rgba(142, 68, 173, 0.3)); }
                100% { filter: drop-shadow(0 0 20px rgba(155, 89, 182, 0.9)) drop-shadow(0 0 8px rgba(142, 68, 173, 0.6)); }
            }

            .rare-item-glow-5 {
                filter: drop-shadow(0 0 15px rgba(241, 196, 15, 0.9)) drop-shadow(0 0 6px rgba(243, 156, 18, 0.5));
                animation: rarePulse5 2s ease-in-out infinite alternate;
            }
            @keyframes rarePulse5 {
                0% { filter: drop-shadow(0 0 6px rgba(241, 196, 15, 0.55)) drop-shadow(0 0 2px rgba(243, 156, 18, 0.35)); }
                100% { filter: drop-shadow(0 0 28px rgba(241, 196, 15, 1)) drop-shadow(0 0 12px rgba(243, 156, 18, 0.75)); }
            }

            .rare-item-glow-6 {
                filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 8px rgba(241, 196, 15, 0.65));
                animation: rarePulse6 2.4s ease-in-out infinite alternate;
            }
            @keyframes rarePulse6 {
                0% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 3px rgba(241, 196, 15, 0.45)); }
                100% { filter: drop-shadow(0 0 34px rgba(255, 255, 255, 1)) drop-shadow(0 0 16px rgba(241, 196, 15, 0.85)) drop-shadow(0 0 4px rgba(255, 255, 255, 0.5)); }
            }

            .rare-item-glow-bonus {
                filter: drop-shadow(0 0 16px rgba(241, 196, 15, 0.85)) drop-shadow(0 0 6px rgba(230, 81, 0, 0.5));
                animation: rarePulseBonus 2s ease-in-out infinite alternate;
            }
            @keyframes rarePulseBonus {
                0% { filter: drop-shadow(0 0 6px rgba(241, 196, 15, 0.55)) drop-shadow(0 0 2px rgba(230, 81, 0, 0.35)); }
                100% { filter: drop-shadow(0 0 30px rgba(241, 196, 15, 1)) drop-shadow(0 0 14px rgba(230, 81, 0, 0.8)); }
            }

            /* Hand Indicator CSS */
            #hand-indicator-container {
                position: fixed;
                left: -180px; /* Completely out of frame by default */
                top: 35%;
                width: 180px;
                height: 180px;
                z-index: 10000000;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                cursor: pointer;
                transition: left 0.4s cubic-bezier(0.25, 1, 0.5, 1), transform 0.2s ease-out;
                pointer-events: auto;
            }
            #hand-indicator-container.visible {
                left: -100px; /* Peek out 80px visible */
            }
            /* JS-driven .hovered replaces :hover so we can control a wider hitbox */
            #hand-indicator-container.hovered {
                left: 0px; /* Perfectly stuck to the screen frame on hover */
            }
            #hand-indicator-img {
                width: 180px;
                height: 180px;
                object-fit: contain;
                filter: drop-shadow(4px 6px 16px rgba(0,0,0,0.35));
                transition: transform 0.15s ease-out;
                user-select: none;
                -webkit-user-drag: none;
            }
            #hand-indicator-label {
                position: absolute;
                top: -20px;
                left: 40px; /* Centered above the 180px hand */
                background-image: url('${assetPrefix}PaperMix-Kraft-09-thumb.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                filter: grayscale(1) brightness(1.22) contrast(1.15);
                color: #131b23;
                padding: 8px 18px;
                font-family: 'Outfit', sans-serif;
                font-size: 0.9rem;
                font-weight: bold;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                white-space: nowrap;
                opacity: 0;
                transform: rotate(-3deg) scale(0.9);
                transition: opacity 0.3s ease, transform 0.3s ease;
                pointer-events: none;
                z-index: 3; /* Topmost */
            }
            #hand-indicator-container.hovered #hand-indicator-label {
                opacity: 0.95;
                transform: rotate(1deg) scale(1);
            }
            /* Hand Rare Preview Slots & Tooltips */
            .hand-rare-preview-slot {
                position: absolute;
                left: 65px;
                top: 65px;
                width: 60px;
                height: 60px;
                opacity: 0;
                transform: translate(0, 0) scale(0);
                z-index: 1;
                pointer-events: auto;
                cursor: pointer;
                transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1),
                            opacity 0.5s ease;
            }
            .hand-rare-preview-slot:hover {
                z-index: 4;
            }
            .hand-rare-preview-img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                user-select: none;
                -webkit-user-drag: none;
                /* All items rendered as dark silhouette — no colour, no texture */
                filter: brightness(0) opacity(0.82);
                transition: transform 0.3s ease, filter 0.3s ease;
                display: block;
            }
            .hand-rare-preview-slot:hover .hand-rare-preview-img {
                transform: scale(1.2) rotate(5deg);
                filter: brightness(0) opacity(1);
            }
            /* Locked items: fainter ghost silhouette */
            .hand-rare-preview-slot.locked .hand-rare-preview-img {
                filter: brightness(0) opacity(0.18);
            }
            .hand-rare-preview-slot.locked:hover .hand-rare-preview-img {
                filter: brightness(0) opacity(0.35);
                transform: scale(1.1) rotate(3deg);
            }
            .hand-rare-preview-tooltip {
                position: absolute;
                bottom: -28px;
                left: 50%;
                transform: translateX(-50%) translateY(4px);
                background-image: url('${assetPrefix}PaperMix-Kraft-09-thumb.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                filter: grayscale(1) brightness(1.2) contrast(1.1);
                color: #2c2523;
                padding: 4px 10px;
                font-family: 'Outfit', sans-serif;
                font-size: 0.72rem;
                font-weight: bold;
                box-shadow: 0 3px 8px rgba(0,0,0,0.25);
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.25s ease, transform 0.25s ease;
                z-index: 10;
            }
            .hand-rare-preview-slot:hover .hand-rare-preview-tooltip {
                opacity: 0.95;
                transform: translateX(-50%) translateY(0);
            }




            /* Shake Bag CSS */
            #shake-bag-container {
                position: fixed;
                bottom: -210px; /* Default: only label visible */
                left: 50%;
                transform: translateX(-50%) rotate(0deg);
                width: 260px;
                height: 260px;
                z-index: 999999;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-end;
                cursor: grab;
                transition: bottom 0.4s cubic-bezier(0.25, 1, 0.5, 1), transform 0.1s ease;
                pointer-events: auto;
                user-select: none;
            }
            #shake-bag-container.active-drag {
                cursor: grabbing;
                transition: bottom 0.1s ease, transform 0.1s ease;
            }
            #shake-bag-img {
                width: 220px;
                height: 220px;
                object-fit: contain;
                filter: drop-shadow(0 10px 20px rgba(0,0,0,0.35));
                user-select: none;
                -webkit-user-drag: none;
                
                /* Default state: hidden */
                opacity: 0;
                transform: translateY(60px) scale(0.9);
                pointer-events: none;
                transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), 
                            opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            }
            #shake-bag-container.revealed #shake-bag-img {
                opacity: 1;
                transform: translateY(0) scale(1);
                pointer-events: auto;
                /* Stagger/delay transition so the bag appears *after* the text/container starts sliding up */
                transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1) 0.15s, 
                            opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1) 0.15s;
            }
            #shake-bag-container.active-drag #shake-bag-img {
                opacity: 1;
                transform: translateY(0) scale(1);
                pointer-events: auto;
                /* No delay when actively dragging */
                transition: none;
            }
            @keyframes label-attention-shake {
                0%, 85%, 100% {
                    transform: rotate(2deg) scale(1);
                }
                87% {
                    transform: rotate(-3deg) scale(1.05);
                }
                89% {
                    transform: rotate(4deg) scale(1.05);
                }
                91% {
                    transform: rotate(-4deg) scale(1.05);
                }
                93% {
                    transform: rotate(3deg) scale(1.05);
                }
                95% {
                    transform: rotate(-2deg) scale(1.05);
                }
                97% {
                    transform: rotate(2deg) scale(1.05);
                }
            }
            #shake-bag-label {
                position: absolute;
                top: -10px;
                background-image: url('${assetPrefix}PaperMix-Kraft-09-thumb.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                filter: grayscale(1) brightness(1.22) contrast(1.15);
                color: #131b23;
                padding: 8px 18px;
                font-family: 'Outfit', sans-serif;
                font-size: 0.9rem;
                font-weight: bold;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                white-space: nowrap;
                opacity: 0.95;
                transform: rotate(2deg);
                pointer-events: none;
                animation: label-attention-shake 3s infinite ease-in-out;
            }
            #shake-bag-container.empty #shake-bag-img {
                filter: drop-shadow(0 10px 20px rgba(0,0,0,0.15)) grayscale(1) opacity(0.4);
            }
            #shake-bag-container.empty #shake-bag-label {
                color: #d90429;
            }
            
            /* Thrown Items flight animation */
            .thrown-item {
                position: fixed !important;
                pointer-events: auto !important;
                z-index: 99999 !important;
                cursor: grab !important;
                user-select: none !important;
                transition: none !important;
            }

            /* ---- Music Mute Button ---- */
            #music-mute-btn {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background-image: url('${assetPrefix}PaperMix-Kraft-09-thumb.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                filter: grayscale(1) brightness(1.2) contrast(1.1);
                color: #131b23;
                border: none;
                padding: 0.55rem 1.25rem;
                font-family: 'Outfit', sans-serif;
                font-size: 0.88rem;
                font-weight: 600;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                cursor: pointer;
                transform: rotate(1.2deg);
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                            filter 0.3s ease,
                            box-shadow 0.3s ease;
                white-space: nowrap;
                user-select: none;
                position: relative;
                z-index: 10;
                outline: none;
            }
            #music-mute-btn:hover {
                transform: rotate(-1.2deg) scale(1.06);
                filter: grayscale(0.1) brightness(1.25) contrast(1.15);
                box-shadow: 0 8px 20px rgba(0,0,0,0.3);
            }
            #music-mute-btn:active {
                transform: rotate(0deg) scale(0.97);
            }
            #music-mute-btn .mute-icon {
                font-size: 1.1rem;
                line-height: 1;
                transition: transform 0.25s ease;
            }
            #music-mute-btn:hover .mute-icon {
                transform: scale(1.2) rotate(-8deg);
            }
            #music-mute-btn.muted .mute-icon {
                opacity: 0.5;
            }
            /* Volume wave pulse animation when music is playing */
            @keyframes musicWavePulse {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 1; }
            }
            #music-mute-btn:not(.muted) .mute-icon {
                animation: musicWavePulse 2.5s ease-in-out infinite;
            }
        `;
        document.head.appendChild(styleEl);
    };

    // 4. Drag & Drop Implementation (Fixing Jump bug)
    let activeDragEl = null;
    let startX = 0, startY = 0;
    let elemStartX = 0, elemStartY = 0;
    let dragOffsetX = 0, dragOffsetY = 0;
    let contentRect = null;

    // Pin the TOP-CENTRE of the leaf-blower PNG (its nozzle) exactly onto the cursor.
    // The PNG carries EXIF orientation and is letterboxed by object-fit, so we can't
    // trust a fixed offset: place a first guess, then measure the *rendered* box and
    // correct by the residual. The correction is exact in one step (pure translation).
    const positionBlowerAtCursor = (containerEl, clientX, clientY) => {
        const blowerImg = document.getElementById('leaf-blower');
        containerEl.style.position = 'fixed';
        containerEl.style.right = 'auto';
        containerEl.style.bottom = 'auto';

        const guessLeft = clientX - 200; // half of the 400px container
        const guessTop = clientY;
        containerEl.style.left = guessLeft + 'px';
        containerEl.style.top = guessTop + 'px';

        if (blowerImg) {
            const r = blowerImg.getBoundingClientRect();
            const dx = clientX - (r.left + r.width / 2);
            const dy = clientY - r.top;
            containerEl.style.left = (guessLeft + dx) + 'px';
            containerEl.style.top = (guessTop + dy) + 'px';
        }
    };

    // Restore the blower to its initial CSS-defined spot (slightly-visible corner)
    // by stripping every inline override so the stylesheet takes back over.
    const resetBlowerPosition = (el) => {
        el.style.left = '';
        el.style.top = '';
        el.style.right = '';
        el.style.bottom = '';
        el.style.position = '';
    };

    const getBaseRotation = (el) => {
        const styleStr = el.getAttribute('style') || '';
        const match = styleStr.match(/--deco-rotation:\s*(-?\d+)deg/);
        return match ? parseInt(match[1], 10) : 0;
    };

    const onMouseDown = (e) => {
        const img = e.target.closest('.deco-img');
        if (!img || img.id === 'drag-basket-img') return;

        e.preventDefault();

        if (img.id === 'leaf-blower') {
            activeDragEl = document.getElementById('leaf-blower-container');
            activeDragEl.classList.add('dragging');
            if (startBlowingRef) startBlowingRef();
        } else {
            activeDragEl = img;
            activeDragEl.classList.add('dragging');
            dragOffsetX = 0;
            dragOffsetY = 0;
            
            // Physics rotation tracking setup
            activeDragEl.baseRotation = getBaseRotation(activeDragEl);
            activeDragEl.dragRotation = 0;
            activeDragEl.lastX = e.clientX;
            activeDragEl.lastY = e.clientY;
            activeDragEl.vx = 0;
            activeDragEl.lastTime = Date.now();
            
            const basket = document.getElementById('drag-basket-container');
            if (basket) {
                basket.classList.add('show-basket');
            }
            
            elemStartX = activeDragEl.offsetLeft;
            elemStartY = activeDragEl.offsetTop;
        }

        const contentContainer = document.querySelector('.sketch-content');
        contentRect = contentContainer ? contentContainer.getBoundingClientRect() : document.body.getBoundingClientRect();

        startX = e.clientX;
        startY = e.clientY;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
        if (!activeDragEl || !contentRect) return;

        // Leaf blower: pin the top of the PNG to the cursor and trail the label.
        if (activeDragEl.id === 'leaf-blower-container') {
            positionBlowerAtCursor(activeDragEl, e.clientX, e.clientY);
            const label = document.getElementById('leaf-blower-label');
            if (label) {
                label.style.display = 'block';
                label.style.left = e.clientX + 'px';
                label.style.top = e.clientY + 'px';
            }
            return;
        }

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        activeDragEl.style.left = (elemStartX + deltaX) + 'px';
        activeDragEl.style.top = (elemStartY + deltaY) + 'px';
        activeDragEl.style.right = 'auto';
        activeDragEl.style.bottom = 'auto';

        // Physics dragging rotation based on speed & acceleration
        const currentTime = Date.now();
        const dt = Math.max(1, currentTime - (activeDragEl.lastTime || currentTime));
        const currentVx = (e.clientX - (activeDragEl.lastX || e.clientX)) / dt;
        
        activeDragEl.vx = activeDragEl.vx || 0;
        activeDragEl.vx += (currentVx - activeDragEl.vx) * 0.25; // Smooth interpolation of velocity
        
        const targetTilt = Math.max(-35, Math.min(35, activeDragEl.vx * 25)); // Proportional tilt
        activeDragEl.dragRotation = activeDragEl.dragRotation || 0;
        activeDragEl.dragRotation += (targetTilt - activeDragEl.dragRotation) * 0.2; // Smooth tilt lag
        
        activeDragEl.lastX = e.clientX;
        activeDragEl.lastTime = currentTime;
        
        const rotationVal = (activeDragEl.baseRotation || 0) + activeDragEl.dragRotation;
        activeDragEl.style.setProperty('--deco-rotation', rotationVal + 'deg');

        // Check if cursor is over basket and apply magnetic attraction
        const basket = document.getElementById('drag-basket-container');
        if (basket) {
            const bRect = basket.getBoundingClientRect();
            const bx = bRect.left + bRect.width / 2;
            const by = bRect.top + bRect.height / 2;
            
            const dx = e.clientX - bx;
            const dy = e.clientY - by;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 320) {
                const force = (320 - dist) / 320;
                const pullX = dx * force * 0.2;
                const pullY = dy * force * 0.2;
                
                basket.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(${1 + force * 0.15})`;
                
                if (e.clientX >= bRect.left && e.clientX <= bRect.right && e.clientY >= bRect.top && e.clientY <= bRect.bottom) {
                    basket.classList.add('drag-over');
                } else {
                    basket.classList.remove('drag-over');
                }
            } else {
                basket.style.transform = '';
                basket.classList.remove('drag-over');
            }
        }
    };

    const onMouseUp = (e) => {
        if (activeDragEl) {
            const el = activeDragEl;
            el.classList.remove('dragging');
            activeDragEl = null;

            if (el.id === 'leaf-blower-container') {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                if (stopBlowingRef) stopBlowingRef();
                const label = document.getElementById('leaf-blower-label');
                if (label) label.style.display = 'none';
                resetBlowerPosition(el);
                return;
            }

            // Restore base rotation with transition
            el.style.setProperty('--deco-rotation', (el.baseRotation || 0) + 'deg');

            const basket = document.getElementById('drag-basket-container');
            let putInBasket = false;
            if (basket) {
                basket.style.transform = ''; // Reset attraction displacement
                if (basket.classList.contains('drag-over')) {
                    putInBasket = true;
                }
                basket.classList.remove('show-basket');
                basket.classList.remove('drag-over');
            }

            if (putInBasket) {
                collectObject(el);
            } else {
                debouncedSave();
            }
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    // Touch Support for Mobile Dragging
    const onTouchStart = (e) => {
        const img = e.target.closest('.deco-img');
        if (!img || img.id === 'drag-basket-img') return;

        e.preventDefault();

        if (img.id === 'leaf-blower') {
            activeDragEl = document.getElementById('leaf-blower-container');
            activeDragEl.classList.add('dragging');
            if (startBlowingRef) startBlowingRef();
        } else {
            activeDragEl = img;
            activeDragEl.classList.add('dragging');
            dragOffsetX = 0;
            dragOffsetY = 0;
            
            // Physics rotation tracking setup
            activeDragEl.baseRotation = getBaseRotation(activeDragEl);
            activeDragEl.dragRotation = 0;
            const touch = e.touches[0];
            activeDragEl.lastX = touch.clientX;
            activeDragEl.lastY = touch.clientY;
            activeDragEl.vx = 0;
            activeDragEl.lastTime = Date.now();
            
            const basket = document.getElementById('drag-basket-container');
            if (basket) {
                basket.classList.add('show-basket');
            }
            
            elemStartX = activeDragEl.offsetLeft;
            elemStartY = activeDragEl.offsetTop;
        }

        const contentContainer = document.querySelector('.sketch-content');
        contentRect = contentContainer ? contentContainer.getBoundingClientRect() : document.body.getBoundingClientRect();

        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;

        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);
    };

    const onTouchMove = (e) => {
        if (!activeDragEl || !contentRect) return;
        e.preventDefault();

        const touch = e.touches[0];

        // Leaf blower: pin the top of the PNG to the finger and trail the label.
        if (activeDragEl.id === 'leaf-blower-container') {
            positionBlowerAtCursor(activeDragEl, touch.clientX, touch.clientY);
            const label = document.getElementById('leaf-blower-label');
            if (label) {
                label.style.display = 'block';
                label.style.left = touch.clientX + 'px';
                label.style.top = touch.clientY + 'px';
            }
            return;
        }

        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;

        activeDragEl.style.left = (elemStartX + deltaX) + 'px';
        activeDragEl.style.top = (elemStartY + deltaY) + 'px';
        activeDragEl.style.right = 'auto';
        activeDragEl.style.bottom = 'auto';

        // Physics dragging rotation based on speed & acceleration
        const currentTime = Date.now();
        const dt = Math.max(1, currentTime - (activeDragEl.lastTime || currentTime));
        const currentVx = (touch.clientX - (activeDragEl.lastX || touch.clientX)) / dt;
        
        activeDragEl.vx = activeDragEl.vx || 0;
        activeDragEl.vx += (currentVx - activeDragEl.vx) * 0.25;
        
        const targetTilt = Math.max(-35, Math.min(35, activeDragEl.vx * 25));
        activeDragEl.dragRotation = activeDragEl.dragRotation || 0;
        activeDragEl.dragRotation += (targetTilt - activeDragEl.dragRotation) * 0.2;
        
        activeDragEl.lastX = touch.clientX;
        activeDragEl.lastTime = currentTime;
        
        const rotationVal = (activeDragEl.baseRotation || 0) + activeDragEl.dragRotation;
        activeDragEl.style.setProperty('--deco-rotation', rotationVal + 'deg');

        // Check if touch is over basket and apply magnetic attraction
        const basket = document.getElementById('drag-basket-container');
        if (basket) {
            const bRect = basket.getBoundingClientRect();
            const bx = bRect.left + bRect.width / 2;
            const by = bRect.top + bRect.height / 2;
            
            const dx = touch.clientX - bx;
            const dy = touch.clientY - by;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 320) {
                const force = (320 - dist) / 320;
                const pullX = dx * force * 0.2;
                const pullY = dy * force * 0.2;
                
                basket.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(${1 + force * 0.15})`;
                
                if (touch.clientX >= bRect.left && touch.clientX <= bRect.right && touch.clientY >= bRect.top && touch.clientY <= bRect.bottom) {
                    basket.classList.add('drag-over');
                } else {
                    basket.classList.remove('drag-over');
                }
            } else {
                basket.style.transform = '';
                basket.classList.remove('drag-over');
            }
        }
    };

    const onTouchEnd = () => {
        if (activeDragEl) {
            const el = activeDragEl;
            el.classList.remove('dragging');
            activeDragEl = null;

            if (el.id === 'leaf-blower-container') {
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
                if (stopBlowingRef) stopBlowingRef();
                const label = document.getElementById('leaf-blower-label');
                if (label) label.style.display = 'none';
                resetBlowerPosition(el);
                return;
            }

            // Restore base rotation with transition
            el.style.setProperty('--deco-rotation', (el.baseRotation || 0) + 'deg');

            const basket = document.getElementById('drag-basket-container');
            let putInBasket = false;
            if (basket) {
                basket.style.transform = '';
                if (basket.classList.contains('drag-over')) {
                    putInBasket = true;
                }
                basket.classList.remove('show-basket');
                basket.classList.remove('drag-over');
            }

            if (putInBasket) {
                collectObject(el);
            } else {
                debouncedSave();
            }
        }
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    };

    // 5. Scroll Wheel to Rotate / Scale
    const onWheel = (e) => {
        const img = e.target.closest('.deco-img');
        if (!img || img.id === 'leaf-blower') return;

        e.preventDefault();

        const styleStr = img.getAttribute('style') || '';

        if (e.shiftKey) {
            let width = img.clientWidth || parseInt(img.style.width, 10) || 100;
            const delta = e.deltaY > 0 ? 5 : -5;
            width = Math.max(40, Math.min(300, width + delta));
            img.style.width = width + 'px';
        } else {
            let rotation = 0;
            const rotMatch = styleStr.match(/--deco-rotation:\s*(-?\d+)deg/);
            if (rotMatch) {
                rotation = parseInt(rotMatch[1], 10);
            }
            const delta = e.deltaY > 0 ? 5 : -5;
            rotation = (rotation + delta) % 360;
            img.style.setProperty('--deco-rotation', rotation + 'deg');
        }

        debouncedSave();
    };

    // 6. Hover Track
    const onMouseEnter = (e) => {
        const img = e.target.closest('.deco-img');
        if (img && img.id !== 'leaf-blower' && img.id !== 'drag-basket-img') {
            hoveredEl = img;
        }
    };
    const onMouseLeave = () => {
        hoveredEl = null;
    };

    // Keydown to Delete
    document.addEventListener('keydown', (e) => {
        if (hoveredEl && (e.key === 'Delete' || e.key === 'Backspace')) {
            e.preventDefault();
            const elToDelete = hoveredEl;
            hoveredEl = null;
            elToDelete.remove();
            debouncedSave();
            showToast('Decoration deleted!');
        }
    });

    // Double-click stamp to delete
    document.addEventListener('dblclick', (e) => {
        const img = e.target.closest('.deco-img');
        if (img && img.id !== 'leaf-blower' && img.id !== 'drag-basket-img') {
            e.preventDefault();
            img.remove();
            debouncedSave();
            showToast('Decoration deleted!');
        }
    });

    // 7. Double-click Empty Space to Add Decoration
    document.addEventListener('dblclick', (e) => {
        if (e.target.closest('.deco-img') || e.target.closest('.sketch-code-panel') || e.target.closest('.sketch-screenshot-panel') || e.target.closest('.sketch-description-panel') || e.target.closest('.back-link') || e.target.closest('.flip-interactive') || e.target.closest('.words-interactive') || e.target.closest('.typoexp-interactive') || e.target.id === 'leaf-blower' || e.target.id === 'drag-basket-img' || e.target.id === 'drag-basket-container') {
            return;
        }

        const contentContainer = document.querySelector('.sketch-content');
        if (!contentContainer) return;

        const rect = contentContainer.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
            e.preventDefault();

            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            const newImg = document.createElement('img');
            newImg.className = 'deco-img deco-pos-custom';
            
            const randAsset = assetPool[Math.floor(Math.random() * assetPool.length)];
            newImg.setAttribute('src', assetPrefix + randAsset);
            
            const randRot = Math.floor(Math.random() * 40) - 20;
            newImg.setAttribute('style', `--deco-rotation: ${randRot}deg; width: 100px; top: ${Math.floor(clickY - 50)}px; left: ${Math.floor(clickX - 50)}px; z-index: 1;`);
            newImg.setAttribute('alt', '');
            newImg.setAttribute('aria-hidden', 'true');

            contentContainer.insertBefore(newImg, contentContainer.firstChild);
            bindEventsToElement(newImg);

            debouncedSave();
            flashElement(newImg);
            showToast('New decoration added!');
        }
    });

    const bindEventsToElement = (el) => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
        el.addEventListener('wheel', onWheel, { passive: false });
    };

    // 8. Save Layout changes to disk
    const debouncedSave = () => {
        if (!document.querySelector('.sketch-content')) return;
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(saveLayoutToDisk, 500);
    };

    const saveLayoutToDisk = () => {
        const docImgs = document.querySelectorAll('.deco-img');
        let htmlLines = ['        <!-- Background collage decorations (behind papers) -->'];

        docImgs.forEach(img => {
            // Exclude Leaf Blower and Basket from being saved to page markup
            if (img.id === 'leaf-blower' || img.id === 'drag-basket-img') return;

            const src = img.getAttribute('src') || '';
            const filename = src.substring(src.lastIndexOf('/') + 1);
            
            // Exclude dynamically spawned rare and bonus items
            if (filename.startsWith('rare-item-') || filename === 'bonus-item.png') return;
            
            let cls = 'deco-img';
            const classes = img.className.split(' ');
            const posClass = classes.find(c => c.startsWith('deco-pos-'));
            if (posClass) {
                cls += ' ' + posClass;
            } else {
                cls += ' deco-pos-custom';
            }

            const styleStr = img.getAttribute('style') || '';
            
            let rotation = 0;
            const rotMatch = styleStr.match(/--deco-rotation:\s*(-?\d+)deg/);
            if (rotMatch) rotation = parseInt(rotMatch[1], 10);
            
            let width = img.style.width || img.clientWidth || 100;
            if (typeof width === 'string' && width.endsWith('px')) {
                width = parseInt(width, 10);
            }
            
            let leftStyle = '';
            let rightStyle = '';
            let topStyle = '';
            let bottomStyle = '';
            
            if (img.style.left) leftStyle = `left: ${img.style.left}; `;
            if (img.style.right) rightStyle = `right: ${img.style.right}; `;
            if (img.style.top) topStyle = `top: ${img.style.top}; `;
            if (img.style.bottom) bottomStyle = `bottom: ${img.style.bottom}; `;

            const zIndexStr = img.style.zIndex ? `z-index: ${img.style.zIndex}; ` : '';
            const fullStyleStr = `--deco-rotation: ${rotation}deg; width: ${width}px; ${topStyle}${bottomStyle}${leftStyle}${rightStyle}${zIndexStr}`.trim();
            
            htmlLines.push(`        <img src="\${prefix}assets/${filename}" class="${cls}" style="${fullStyleStr}" alt="" aria-hidden="true">`);
        });

        const finalCode = htmlLines.join('\n');
        
        let relativePath = decodeURIComponent(window.location.pathname);
        if (relativePath.startsWith('/')) {
            relativePath = relativePath.substring(1);
        }
        if (!relativePath) {
            relativePath = 'index.html';
        }

        fetch('/save-decorations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filePath: relativePath,
                decorHtml: finalCode
            })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.error || 'Server error') });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                showToast('Layout saved automatically!');
            }
        })
        .catch(err => {
            console.warn('[Layout Editor] Direct disk save failed. Make sure server.js is running:', err.message);
        });
    };

    // Helper: Toast Notification
    const showToast = (msg) => {
        const oldToast = document.getElementById('deco-toast-notif');
        if (oldToast) oldToast.remove();

        const toast = document.createElement('div');
        toast.id = 'deco-toast-notif';
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%) translateY(100px) rotate(-1deg)';
        toast.style.backgroundImage = `url('${assetPrefix}PaperMix-Kraft-09-thumb.png')`;
        toast.style.backgroundSize = '100% 100%';
        toast.style.backgroundRepeat = 'no-repeat';
        toast.style.filter = 'grayscale(1) brightness(1.22) contrast(1.15)';
        toast.style.color = '#131b23';
        toast.style.padding = '12px 28px';
        toast.style.border = 'none';
        toast.style.fontFamily = "'Outfit', sans-serif";
        toast.style.fontWeight = 'bold';
        toast.style.fontSize = '0.95rem';
        toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.25)';
        toast.style.zIndex = '1000000';
        toast.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        toast.innerText = msg;

        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0) rotate(1deg)';
        }, 50);

        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px) rotate(-1deg)';
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 3000);
    };

    // Helper: Flash Highlight
    const flashElement = (el) => {
        let originalOutline = el.style.outline;
        let originalTransition = el.style.transition;
        el.style.transition = 'none';
        el.style.outline = '4px solid #2ecc71';
        el.style.outlineOffset = '6px';
        
        setTimeout(() => {
            el.style.transition = 'outline 0.5s ease';
            el.style.outline = originalOutline || 'none';
            setTimeout(() => {
                el.style.transition = originalTransition;
            }, 500);
        }, 600);
    };

    // 9. Leaf Blower Logic
    const initLeafBlower = () => {
        const blowerContainer = document.createElement('div');
        blowerContainer.id = 'leaf-blower-container';
        blowerContainer.innerHTML = `
            <img src="${assetPrefix}Leaf-Blower.png" id="leaf-blower" class="deco-img" alt="" aria-hidden="true">
            <div id="leaf-blower-label">Leaf Blower</div>
        `;
        document.body.appendChild(blowerContainer);

        const blower = document.getElementById('leaf-blower');
        const label = document.getElementById('leaf-blower-label');

        // Let label follow cursor inside container
        blowerContainer.addEventListener('mousemove', (e) => {
            if (activeDragEl === blowerContainer) return; // Managed by global mousemove!
            label.style.display = 'block';
            label.style.left = e.clientX + 'px';
            label.style.top = e.clientY + 'px';
        });

        blowerContainer.addEventListener('mouseleave', () => {
            if (activeDragEl === blowerContainer) return; // Keep label visible if dragging!
            label.style.display = 'none';
        });

        // Blowing physics
        let isBlowing = false;
        let blowingLoopId = null;

        const startBlowing = () => {
            if (isBlowing) return;
            isBlowing = true;
            runBlowingLoop();
        };

        const stopBlowing = () => {
            isBlowing = false;
            cancelAnimationFrame(blowingLoopId);
            debouncedSave(); // Overwrite file on disk when blowing stops!
        };

        startBlowingRef = startBlowing;
        stopBlowingRef = stopBlowing;

        const runBlowingLoop = () => {
            if (!isBlowing) return;

            const blowerRect = blower.getBoundingClientRect();
            const contentContainer = document.querySelector('.sketch-content');
            if (!contentContainer) {
                blowingLoopId = requestAnimationFrame(runBlowingLoop);
                return;
            }
            const cRect = contentContainer.getBoundingClientRect();

            // The nozzle is the TOP-CENTRE of the PNG in both hover and drag states
            // (upright blower) — i.e. exactly where the cursor pins it while dragging.
            const bx = blowerRect.left + blowerRect.width / 2;
            const by = blowerRect.top;

            const docImgs = document.querySelectorAll('.deco-img');
            docImgs.forEach(img => {
                // Ignore leaf blower, basket image, and any currently dragged element
                if (img === blower || img.id === 'drag-basket-img' || img.classList.contains('dragging')) return;

                const imgRect = img.getBoundingClientRect();
                const cx = imgRect.left + imgRect.width / 2;
                const cy = imgRect.top + imgRect.height / 2;

                const dx = cx - bx;
                const dy = cy - by;
                const dist = Math.sqrt(dx*dx + dy*dy);

                // Affect items within 450px radius (reduced active zone of push)
                if (dist < 450 && dist > 10) {
                    const force = (450 - dist) / 450;
                    const speed = force * 9; // wind speed per frame

                    const vx = (dx / dist) * speed;
                    const vy = (dy / dist) * speed;

                    // ALWAYS use un-transformed layout offsets relative to offsetParent
                    let elemLeft = img.offsetLeft;
                    let elemTop = img.offsetTop;

                    let newLeft = elemLeft + vx;
                    let newTop = elemTop + vy;

                    // Bound constraints to keep stamps inside the page content area
                    const minLeft = -80;
                    const maxLeft = cRect.width + 20;
                    const minTop = -50;
                    const maxTop = Math.max(800, cRect.height + 50);

                    newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
                    newTop = Math.max(minTop, Math.min(maxTop, newTop));

                    img.style.left = newLeft + 'px';
                    img.style.top = newTop + 'px';
                    img.style.right = 'auto';
                    img.style.bottom = 'auto';
                }
            });

            blowingLoopId = requestAnimationFrame(runBlowingLoop);
        };

        // Blower only active when grabbed (which is triggered in onMouseDown / onTouchStart)
        blowerContainer.addEventListener('mouseleave', () => {
            if (activeDragEl === blowerContainer) return; // Keep blowing if dragging!
            stopBlowing();
        });
    };

    // 9b. Basket Logic for Secret Collection
    const initBasket = () => {
        const basketContainer = document.createElement('div');
        basketContainer.id = 'drag-basket-container';
        basketContainer.innerHTML = `
            <img src="${assetPrefix}Basket.png" id="drag-basket-img" alt="" aria-hidden="true">
            <div id="drag-basket-label">Secret Collection Drawer</div>
        `;
        document.body.appendChild(basketContainer);
    };

    // Add dragged element to Secret Collection localStorage and animate drop
    const collectObject = (el) => {
        const src = el.getAttribute('src') || '';
        const filename = src.substring(src.lastIndexOf('/') + 1);
        const name = formatName(filename);
        
        let collected = [];
        try {
            collected = JSON.parse(localStorage.getItem('collected_objects')) || [];
        } catch(e) {
            collected = [];
        }
        
        const alreadyExists = collected.some(item => item.filename === filename);
        if (!alreadyExists) {
            collected.push({
                filename: filename,
                name: name,
                src: src,
                timestamp: Date.now()
            });
            localStorage.setItem('collected_objects', JSON.stringify(collected));
        }

        // Play drop-into-basket animation (slide to basket and shrink to zero)
        el.style.transition = 'transform 0.45s cubic-bezier(0.6, -0.28, 0.735, 0.045), opacity 0.45s ease';
        el.style.transformOrigin = 'center center';
        
        const basket = document.getElementById('drag-basket-container');
        if (basket) {
            const bRect = basket.getBoundingClientRect();
            const eRect = el.getBoundingClientRect();
            const deltaX = (bRect.left + bRect.width / 2) - (eRect.left + eRect.width / 2);
            const deltaY = (bRect.top + bRect.height / 2) - (eRect.top + eRect.height / 2);
            
            el.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.05) rotate(540deg)`;
        } else {
            el.style.transform = 'scale(0) rotate(360deg)';
        }
        el.style.opacity = '0';
        
        setTimeout(() => {
            el.remove();
            debouncedSave(); // Remove permanently from HTML page layout
            showToast(`Collected: ${name}! Check Secret Drawer.`);
        }, 450);
    };

    const formatName = (filename) => {
        let name = filename.replace('.png', '');
        name = name.replace(/_h|_v|_hv/g, ''); // Remove mirroring suffixes
        name = name.replace(/-/g, ' ');
        name = name.replace(/_/g, ' ');
        return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const checkAndSpawnRareItems = () => {
        const contentContainer = document.querySelector('.sketch-content');
        if (!contentContainer) return;

        // 1. Uncollected rare items list
        let collected = [];
        try {
            collected = JSON.parse(localStorage.getItem('collected_objects')) || [];
        } catch(e) {
            collected = [];
        }

        // Check if there is already a rare item or bonus item spawned on the page
        const hasRareOnPage = Array.from(document.querySelectorAll('.deco-img')).some(img => {
            const src = img.getAttribute('src') || '';
            const filename = src.substring(src.lastIndexOf('/') + 1);
            return filename.startsWith('rare-item-') || filename === 'bonus-item.png';
        });
        if (hasRareOnPage) return; // Never spawn more than 1 rare item on the same page project

        const ordinaryCollected = collected.filter(item => {
            const filename = item.filename || '';
            return !filename.startsWith('rare-item-') && filename !== 'bonus-item.png';
        });
        const N_ordinary = ordinaryCollected.length;

        // Spawning rules:
        // Minimum 3 ordinary items collected before any rare item can spawn
        if (N_ordinary >= 3) {
            // Time-window check: spawn window is first 15 seconds of any minute (0 to 15)
            const secs = new Date().getSeconds();
            const isTimeWindow = (secs >= 0 && secs <= 15);

            // Luck probability increases with number of ordinary items collected
            // Base chance: 5% when N_ordinary=3, rising by 5% per extra item up to 85%
            const luckProbability = Math.min(0.85, 0.05 + 0.05 * (N_ordinary - 3));

            if (isTimeWindow && Math.random() < luckProbability) {
                // Find the first uncollected rare item (from 1 to 6)
                let rareIndexToSpawn = null;
                for (let i = 1; i <= 6; i++) {
                    const filename = `rare-item-${i}.png`;
                    const alreadyCollected = collected.some(item => {
                        const itemFile = item.filename || '';
                        return itemFile.toLowerCase() === filename.toLowerCase();
                    });
                    if (!alreadyCollected) {
                        rareIndexToSpawn = i;
                        break;
                    }
                }

                if (rareIndexToSpawn !== null) {
                    // Spawn the rare item!
                    const newImg = document.createElement('img');
                    newImg.className = `deco-img deco-pos-custom rare-item-glow-${rareIndexToSpawn}`;
                    newImg.setAttribute('src', assetPrefix + `rare-item-${rareIndexToSpawn}.png`);
                    
                    // Random position inside the sketch container
                    const randX = Math.floor(Math.random() * 60 + 20); // 20% to 80%
                    const randY = Math.floor(Math.random() * 50 + 20); // 20% to 70%
                    const randRot = Math.floor(Math.random() * 30) - 15; // -15deg to 15deg
                    
                    newImg.setAttribute('style', `--deco-rotation: ${randRot}deg; width: 110px; top: ${randY}%; left: ${randX}%; z-index: 100; position: absolute;`);
                    newImg.setAttribute('alt', `Rare Item ${rareIndexToSpawn}`);
                    newImg.setAttribute('aria-hidden', 'true');
                    
                    contentContainer.appendChild(newImg);
                    bindEventsToElement(newImg);
                    console.log(`[Rare Spawner] Spawned rare-item-${rareIndexToSpawn}.png! Luck: ${luckProbability.toFixed(2)}, TimeSecs: ${secs}`);
                    return; // Only spawn one rare item
                }
            }
        }

        // 2. Bonus Item Spawning (Independent 3% chance on load, time-window: 45 to 59 seconds)
        const hasBonusCollected = collected.some(item => {
            const itemFile = item.filename || '';
            return itemFile.toLowerCase() === 'bonus-item.png';
        });
        if (!hasBonusCollected) {
            const secs = new Date().getSeconds();
            const isBonusTimeWindow = (secs >= 45 && secs <= 59);
            if (isBonusTimeWindow && Math.random() < 0.03) {
                // Spawn the bonus item!
                const newImg = document.createElement('img');
                newImg.className = 'deco-img deco-pos-custom rare-item-glow-bonus';
                newImg.setAttribute('src', assetPrefix + `bonus-item.png`);
                
                const randX = Math.floor(Math.random() * 60 + 20);
                const randY = Math.floor(Math.random() * 50 + 20);
                const randRot = Math.floor(Math.random() * 30) - 15;
                
                newImg.setAttribute('style', `--deco-rotation: ${randRot}deg; width: 110px; top: ${randY}%; left: ${randX}%; z-index: 100; position: absolute;`);
                newImg.setAttribute('alt', `Bonus Item`);
                newImg.setAttribute('aria-hidden', 'true');
                
                contentContainer.appendChild(newImg);
                bindEventsToElement(newImg);
                console.log(`[Rare Spawner] Spawned bonus-item.png!`);
            }
        }
    };

    const throwItemFromBag = (startX, startY, initVx, initVy) => {
        const contentContainer = document.querySelector('.sketch-content') || document.body;
        const isSketchPage = document.querySelector('.sketch-content') !== null;

        let collected = [];
        try {
            collected = JSON.parse(localStorage.getItem('collected_objects')) || [];
        } catch(e) {
            collected = [];
        }

        // Determine if we spawn a rare item
        let assetName = '';
        let isRare = false;
        let rareIndex = null;

        const hasRareOnPage = Array.from(document.querySelectorAll('.deco-img')).some(img => {
            const src = img.getAttribute('src') || '';
            const filename = src.substring(src.lastIndexOf('/') + 1);
            return filename.startsWith('rare-item-') || filename === 'bonus-item.png';
        });

        // 5% chance to drop the next uncollected rare item, if progression allowed (N_ordinary >= 3)
        const ordinaryCollected = collected.filter(item => {
            const filename = item.filename || '';
            return !filename.startsWith('rare-item-') && filename !== 'bonus-item.png';
        });
        const N_ordinary = ordinaryCollected.length;

        if (!hasRareOnPage && N_ordinary >= 3 && Math.random() < 0.05) {
            // Find first uncollected rare item
            for (let i = 1; i <= 6; i++) {
                const filename = `rare-item-${i}.png`;
                const alreadyCollected = collected.some(item => {
                    const itemFile = item.filename || '';
                    return itemFile.toLowerCase() === filename.toLowerCase();
                });
                if (!alreadyCollected) {
                    rareIndex = i;
                    isRare = true;
                    break;
                }
            }
        }

        if (isRare && rareIndex !== null) {
            assetName = `rare-item-${rareIndex}.png`;
        } else {
            // Pick a random ordinary asset from assetPool
            assetName = assetPool[Math.floor(Math.random() * assetPool.length)];
        }

        const img = document.createElement('img');
        img.src = assetPrefix + assetName;
        img.className = 'deco-img thrown-item';
        if (isRare && rareIndex !== null) {
            img.className += ` rare-item-glow-${rareIndex}`;
        }
        img.style.width = '100px';
        img.style.position = 'absolute';
        
        // Convert screen coordinates to relative coordinates inside contentContainer
        const cRect = contentContainer.getBoundingClientRect();
        let px = startX - cRect.left - 50;
        let py = startY - cRect.top - 50;
        img.style.left = `${px}px`;
        img.style.top = `${py}px`;

        contentContainer.appendChild(img);

        // Physics variables with lower puissance throw forces
        let vx = initVx * 0.15;
        let vy = initVy * 0.15 - 2; // Soft upward pop
        let rotation = Math.floor(Math.random() * 360);
        let rotSpeed = (Math.random() * 6 - 3) + (vx * 0.5);
        const gravity = 0; // No gravity!
        const friction = 0.96; // Higher air friction to slow down and stop within 2 seconds
        const startTime = Date.now();

        const loop = () => {
            // If the element is currently being dragged, stop the physics loop!
            if (img.classList.contains('dragging') || activeDragEl === img) {
                img.classList.remove('thrown-item');
                bindEventsToElement(img);
                debouncedSave();
                return;
            }

            const settledCount = Array.from(document.querySelectorAll('.deco-img:not(.thrown-item):not(#leaf-blower)')).length;
            const canSettle = isRare || (settledCount < 25);

            // Settle or remove check once stopped moving (or safety timeout of 5 seconds)
            const speed = Math.sqrt(vx * vx + vy * vy);
            const elapsed = Date.now() - startTime;
            if (speed < 0.05 || elapsed > 5000) {
                if (canSettle) {
                    img.classList.remove('thrown-item');
                    img.style.left = `${Math.round(px)}px`;
                    img.style.top = `${Math.round(py)}px`;
                    bindEventsToElement(img);
                    debouncedSave();
                    return;
                } else {
                    img.remove();
                    return;
                }
            }

            vx *= friction;
            vy *= friction;
            rotSpeed *= friction;
            
            px += vx;
            py += vy;
            rotation += rotSpeed;

            img.style.left = `${px}px`;
            img.style.top = `${py}px`;
            img.style.setProperty('--deco-rotation', `${Math.round(rotation)}deg`);
            img.style.transform = `rotate(${Math.round(rotation)}deg)`;

            const currentCRect = contentContainer.getBoundingClientRect();
            const rect = img.getBoundingClientRect();

            // Bounce off left
            if (rect.left < 0) {
                vx = Math.abs(vx) * 0.6;
                px = -currentCRect.left;
                img.style.left = `${px}px`;
            }
            // Bounce off right
            else if (rect.right > window.innerWidth) {
                vx = -Math.abs(vx) * 0.6;
                px = window.innerWidth - 100 - currentCRect.left;
                img.style.left = `${px}px`;
            }

            // Bounce off top
            if (rect.top < 0) {
                vy = Math.abs(vy) * 0.6;
                py = -currentCRect.top;
                img.style.top = `${py}px`;
            }

            // Bounce off bottom
            if (rect.bottom > window.innerHeight) {
                vy = -Math.abs(vy) * 0.6;
                py = window.innerHeight - 100 - currentCRect.top;
                img.style.top = `${py}px`;
            }

            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    };

    const initAudioPlayer = () => {
        // ---------------------------------------------------------
        // BACKGROUND MUSIC PLAYER
        // Autoplay trick: always start audio MUTED (browsers permit
        // muted autoplay), then immediately unmute — sound plays
        // from the very first page load without any user gesture.
        // ---------------------------------------------------------
        const AUDIO_SRC = `${assetPrefix}Milky - Just The Way You Are Official 4K Video.mp3`;
        const TIME_KEY  = 'music_time';   // sessionStorage: playback position
        const MUTE_KEY  = 'music_muted';  // sessionStorage: user mute preference

        const audio = document.createElement('audio');
        audio.id     = 'bg-music-audio';
        audio.src    = AUDIO_SRC;
        audio.loop   = true;
        audio.volume = 0.35;
        audio.preload = 'auto';
        // CRITICAL: start muted so browsers allow autoplay
        audio.muted  = true;
        document.body.appendChild(audio);

        // Restore saved playback position seamlessly across page loads
        const savedTime = parseFloat(sessionStorage.getItem(TIME_KEY));
        if (!isNaN(savedTime) && savedTime > 0) {
            audio.addEventListener('canplay', () => {
                audio.currentTime = savedTime;
            }, { once: true });
        }

        // Save position every second + on page unload
        setInterval(() => {
            if (!audio.paused) sessionStorage.setItem(TIME_KEY, audio.currentTime);
        }, 1000);
        window.addEventListener('pagehide', () => {
            sessionStorage.setItem(TIME_KEY, audio.currentTime);
        });

        // User mute preference — always false (playing) on fresh session
        let isMuted = sessionStorage.getItem(MUTE_KEY) === 'true';

        // Attempt autoplay (muted — always succeeds in modern browsers).
        // Then immediately unmute if user wants sound.
        audio.play().then(() => {
            // Autoplay started (muted). Now honour user preference.
            audio.muted = isMuted;
        }).catch(() => {
            // Even muted autoplay failed (very restrictive env).
            // Fall back to first-gesture trigger.
            const tryPlay = () => {
                audio.play().then(() => {
                    audio.muted = isMuted;
                }).catch(() => {});
            };
            document.addEventListener('click',      tryPlay, { once: true });
            document.addEventListener('keydown',    tryPlay, { once: true });
            document.addEventListener('touchstart', tryPlay, { once: true });
        });

        // Mute button — only on index page (where .secret-collection-section exists)
        const secretSection = document.querySelector('.secret-collection-section');
        if (secretSection) {
            const btn = document.createElement('button');
            btn.id = 'music-mute-btn';
            btn.setAttribute('aria-label', 'Toggle music');
            btn.innerHTML = `<span class="mute-icon">${isMuted ? '🔇' : '🎵'}</span><span class="mute-label">${isMuted ? 'Music off' : 'Music on'}</span>`;
            if (isMuted) btn.classList.add('muted');

            secretSection.style.gap = '1.2rem';
            secretSection.appendChild(btn);

            const updateBtn = () => {
                const icon  = btn.querySelector('.mute-icon');
                const label = btn.querySelector('.mute-label');
                if (isMuted) {
                    icon.textContent  = '🔇';
                    label.textContent = 'Music off';
                    btn.classList.add('muted');
                } else {
                    icon.textContent  = '🎵';
                    label.textContent = 'Music on';
                    btn.classList.remove('muted');
                }
            };

            btn.addEventListener('click', () => {
                isMuted = !isMuted;
                audio.muted = isMuted;
                sessionStorage.setItem(MUTE_KEY, isMuted);
                updateBtn();
                // Resume if somehow paused while unmuting
                if (!isMuted && audio.paused) {
                    audio.play().catch(() => {});
                }
            });
        }
    };

    const initHandIndicator = () => {
        // Hand Indicator DOM
        const handContainer = document.createElement('div');
        handContainer.id = 'hand-indicator-container';
        handContainer.innerHTML = `
            <div id="hand-indicator-label">Find all the rare items!</div>
            <img src="${assetPrefix}hand-variable-1.png" id="hand-indicator-img" alt="">
        `;
        document.body.appendChild(handContainer);

        // 5000ms delay to peek out
        setTimeout(() => {
            handContainer.classList.add('visible');
        }, 5000);

        const handImg = document.getElementById('hand-indicator-img');

        const RARE_ITEMS_METADATA = [
            { id: 1, filename: 'rare-item-1.png', name: 'Ornate Key' },
            { id: 2, filename: 'rare-item-2.png', name: 'Jade Scarab' },
            { id: 3, filename: 'rare-item-3.png', name: 'Ruby Crystal' },
            { id: 4, filename: 'rare-item-4.png', name: 'Cosmic Hourglass' },
            { id: 5, filename: 'rare-item-5.png', name: 'Golden Gear' },
            { id: 6, filename: 'rare-item-6.png', name: 'Crystal Prism' }
        ];

        const rebuildRarePreviews = () => {
            const oldPreviews = handContainer.querySelectorAll('.hand-rare-preview-slot');
            oldPreviews.forEach(p => p.remove());

            let collected = [];
            try {
                collected = JSON.parse(localStorage.getItem('collected_objects')) || [];
            } catch(e) { collected = []; }

            const R = 135;
            const startAngle = -85 * Math.PI / 180;
            const endAngle   =  85 * Math.PI / 180;

            RARE_ITEMS_METADATA.forEach((item, index) => {
                const angle = startAngle + index * (endAngle - startAngle) / (6 - 1);
                const dx = R * Math.cos(angle);
                const dy = R * Math.sin(angle);

                const slotDiv = document.createElement('div');
                slotDiv.className = 'hand-rare-preview-slot';

                slotDiv.addEventListener('click', (e) => {
                    e.stopPropagation();
                    handContainer.click();
                });

                const isCollected = collected.some(c => c.filename && c.filename.toLowerCase() === item.filename.toLowerCase());
                if (!isCollected) slotDiv.className += ' locked';

                const img = document.createElement('img');
                img.src = assetPrefix + item.filename;
                img.className = 'hand-rare-preview-img';
                img.alt = item.name;
                if (isCollected) img.className += ` rare-item-glow-${item.id}`;

                const tooltip = document.createElement('div');
                tooltip.className = 'hand-rare-preview-tooltip';
                tooltip.innerText = isCollected ? item.name : 'Locked';

                slotDiv.appendChild(img);
                slotDiv.appendChild(tooltip);
                slotDiv.style.transitionDelay = `${index * 0.05}s`;
                handContainer.appendChild(slotDiv);

                requestAnimationFrame(() => {
                    slotDiv.style.transform = `translate(${dx}px, ${dy}px) scale(1)`;
                    slotDiv.style.opacity = '1';
                });
            });
        };

        const hideRarePreviews = () => {
            const previews = handContainer.querySelectorAll('.hand-rare-preview-slot');
            previews.forEach(preview => {
                preview.style.transitionDelay = '0s';
                preview.style.transform = 'translate(0, 0) scale(0)';
                preview.style.opacity = '0';
                setTimeout(() => preview.remove(), 500);
            });
        };

        // --------------------------------------------------------
        // EXPANDED HOVER ZONE — JS-driven to cover arc item area
        // The hand container is 180×180. Items fan out 135px from
        // the center (90,90), so they reach up to ~225px rightward
        // and 135px up/down from center. We monitor document
        // mousemove and activate .hovered whenever the cursor is
        // within this expanded zone, giving plenty of room.
        // --------------------------------------------------------
        const ARC_REACH  = 160; // px beyond the container to keep hover active
        let isHovered = false;

        const enterHover = () => {
            if (isHovered) return;
            isHovered = true;
            handContainer.classList.add('hovered');
            handImg.src = `${assetPrefix}hand-variable-2.png`;
            rebuildRarePreviews();
        };

        const leaveHover = () => {
            if (!isHovered) return;
            isHovered = false;
            handContainer.classList.remove('hovered');
            handImg.src = `${assetPrefix}hand-variable-1.png`;
            handContainer.style.transform = 'translateY(-50%)';
            hideRarePreviews();
        };

        document.addEventListener('mousemove', (e) => {
            const rect = handContainer.getBoundingClientRect();
            // Expanded bounding box: full arc radius in every direction
            const inZone = (
                e.clientX >= rect.left   - ARC_REACH &&
                e.clientX <= rect.right  + ARC_REACH &&
                e.clientY >= rect.top    - ARC_REACH &&
                e.clientY <= rect.bottom + ARC_REACH
            );

            if (inZone) {
                enterHover();
                // Vertical parallax (only when in container's original width)
                if (e.clientX <= rect.right + 10) {
                    const cy = rect.top + rect.height / 2;
                    const dy = e.clientY - cy;
                    const offsetY = (dy / (rect.height / 2)) * 20;
                    handContainer.style.transform = `translateY(-50%) translate3d(0, ${offsetY}px, 0)`;
                }
            } else {
                leaveHover();
            }
        });

        // Click hand: take user to secret drawer!
        handContainer.addEventListener('click', () => {
            let target = 'secret-collection.html';
            const path = window.location.pathname;
            if (path.includes('/sketches/html/') || path.includes('/sketches/p5js/')) {
                target = '../../secret-collection.html';
            } else if (path.includes('/archive/')) {
                target = '../secret-collection.html';
            }
            window.location.href = target;
        });
    };

    const initShakeBag = () => {
        // ----------------------------------------------------
        // SHAKEABLE BAG
        // ----------------------------------------------------
        const bagContainer = document.createElement('div');
        bagContainer.id = 'shake-bag-container';
        bagContainer.innerHTML = `
            <div id="shake-bag-label">Shake the bag</div>
            <img src="${assetPrefix}bag.png" id="shake-bag-img" alt="">
        `;
        document.body.appendChild(bagContainer);

        let bagTimeout = null;
        let isDraggingBag = false;
        let bagStartX = 0, bagStartY = 0;
        
        // Physics variables for shaking
        let lastBagX = 0, lastBagY = 0;
        let bagVx = 0, bagVy = 0;
        let lastBagTime = Date.now();
        let shakeScore = 0;

        const updateBagLimitState = () => {
            const stamps = Array.from(document.querySelectorAll('.deco-img')).filter(img => {
                return img.id !== 'leaf-blower' && img.id !== 'drag-basket-img';
            });
            const totalItems = stamps.length;
            const label = document.getElementById('shake-bag-label');
            if (totalItems >= 25) {
                if (label) {
                    label.innerHTML = '⚠️ The bag is empty! (Limit reached)';
                }
                bagContainer.classList.add('empty');
                return true; // limit reached
            } else {
                if (label && label.innerHTML.includes('empty')) {
                    label.innerHTML = 'Shake the bag';
                }
                bagContainer.classList.remove('empty');
                return false; // limit not reached
            }
        };

        // Move listener to pop up bag and slide down on stop
        window.addEventListener('mousemove', (e) => {
            if (isDraggingBag) return;
            
            updateBagLimitState();
            
            const isOverBag = bagContainer.contains(e.target);
            // Pop up the bag only when hovering near the bottom label (bottom 150px of viewport) or over the bag container itself
            if (e.clientY > window.innerHeight - 150 || isOverBag) {
                bagContainer.style.bottom = '-40px';
                bagContainer.classList.add('revealed');

                clearTimeout(bagTimeout);
                bagTimeout = setTimeout(() => {
                    if (!isDraggingBag) {
                        bagContainer.style.bottom = '-210px';
                        bagContainer.classList.remove('revealed');
                    }
                }, 1500); // hides after 1.5 seconds of inactivity
            } else {
                // Slide down immediately if the mouse moves away from the bottom area
                if (!isDraggingBag) {
                    bagContainer.style.bottom = '-210px';
                    bagContainer.classList.remove('revealed');
                }
            }
        });

        // Drag / Grab Bag
        const onBagMouseDown = (e) => {
            e.preventDefault();
            
            updateBagLimitState();
            
            isDraggingBag = true;
            bagContainer.classList.add('active-drag');

            bagStartX = e.clientX;
            bagStartY = e.clientY;
            
            lastBagX = e.clientX;
            lastBagY = e.clientY;
            bagVx = 0;
            bagVy = 0;
            lastBagTime = Date.now();
            shakeScore = 0;

            document.addEventListener('mousemove', onBagMouseMove);
            document.addEventListener('mouseup', onBagMouseUp);
        };

        const onBagMouseMove = (e) => {
            if (!isDraggingBag) return;

            const dx = e.clientX - bagStartX;
            const dy = e.clientY - bagStartY;

            const targetBottom = -40 - dy;
            const targetLeft = window.innerWidth / 2 + dx;

            bagContainer.style.bottom = `${targetBottom}px`;
            bagContainer.style.left = `${targetLeft}px`;
            bagContainer.style.transform = 'none';

            // Physics / Shake Calculation
            const now = Date.now();
            const dt = Math.max(1, now - lastBagTime);
            const currentVx = (e.clientX - lastBagX) / dt;
            const currentVy = (e.clientY - lastBagY) / dt;

            bagVx += (currentVx - bagVx) * 0.4;
            bagVy += (currentVy - bagVy) * 0.4;

            lastBagX = e.clientX;
            lastBagY = e.clientY;
            lastBagTime = now;

            const speed = Math.sqrt(bagVx * bagVx + bagVy * bagVy);
            
            if (speed > 1.2) {
                shakeScore += speed * 1.5;
                const tilt = Math.max(-25, Math.min(25, bagVx * 15));
                bagContainer.style.transform = `rotate(${tilt}deg)`;

                if (shakeScore > 40) {
                    shakeScore = 0; // reset
                    if (!updateBagLimitState()) {
                        throwItemFromBag(e.clientX, e.clientY, bagVx * 10, bagVy * 10);
                    }
                }
            } else {
                shakeScore = Math.max(0, shakeScore - 0.5);
                bagContainer.style.transform = 'rotate(0deg)';
            }
        };

        const onBagMouseUp = () => {
            if (!isDraggingBag) return;
            isDraggingBag = false;
            bagContainer.classList.remove('active-drag');

            bagContainer.style.left = '50%';
            bagContainer.style.bottom = '-40px';
            bagContainer.style.transform = 'translateX(-50%) rotate(0deg)';
            bagContainer.classList.add('revealed'); // Keep revealed state visible on release

            document.removeEventListener('mousemove', onBagMouseMove);
            document.removeEventListener('mouseup', onBagMouseUp);

            clearTimeout(bagTimeout);
            bagTimeout = setTimeout(() => {
                if (!isDraggingBag) {
                    bagContainer.style.bottom = '-210px';
                    bagContainer.classList.remove('revealed');
                }
            }, 1500);
        };

        // Touch support for Bag Dragging
        const onBagTouchStart = (e) => {
            e.preventDefault();
            
            updateBagLimitState();
            
            isDraggingBag = true;
            bagContainer.classList.add('active-drag');

            const touch = e.touches[0];
            bagStartX = touch.clientX;
            bagStartY = touch.clientY;
            
            lastBagX = touch.clientX;
            lastBagY = touch.clientY;
            bagVx = 0;
            bagVy = 0;
            lastBagTime = Date.now();
            shakeScore = 0;

            document.addEventListener('touchmove', onBagTouchMove, { passive: false });
            document.addEventListener('touchend', onBagTouchEnd);
        };

        const onBagTouchMove = (e) => {
            if (!isDraggingBag) return;
            e.preventDefault();

            const touch = e.touches[0];
            const dx = touch.clientX - bagStartX;
            const dy = touch.clientY - bagStartY;

            const targetBottom = -40 - dy;
            const targetLeft = window.innerWidth / 2 + dx;

            bagContainer.style.bottom = `${targetBottom}px`;
            bagContainer.style.left = `${targetLeft}px`;
            bagContainer.style.transform = 'none';

            const now = Date.now();
            const dt = Math.max(1, now - lastBagTime);
            const currentVx = (touch.clientX - lastBagX) / dt;
            const currentVy = (touch.clientY - lastBagY) / dt;

            bagVx += (currentVx - bagVx) * 0.4;
            bagVy += (currentVy - bagVy) * 0.4;

            lastBagX = touch.clientX;
            lastBagY = touch.clientY;
            lastBagTime = now;

            const speed = Math.sqrt(bagVx * bagVx + bagVy * bagVy);
            if (speed > 1.2) {
                shakeScore += speed * 1.5;
                const tilt = Math.max(-25, Math.min(25, bagVx * 15));
                bagContainer.style.transform = `rotate(${tilt}deg)`;

                if (shakeScore > 40) {
                    shakeScore = 0;
                    if (!updateBagLimitState()) {
                        throwItemFromBag(touch.clientX, touch.clientY, bagVx * 10, bagVy * 10);
                    }
                }
            } else {
                shakeScore = Math.max(0, shakeScore - 0.5);
                bagContainer.style.transform = 'rotate(0deg)';
            }
        };

        const onBagTouchEnd = () => {
            if (!isDraggingBag) return;
            isDraggingBag = false;
            bagContainer.classList.remove('active-drag');

            bagContainer.style.left = '50%';
            bagContainer.style.bottom = '-40px';
            bagContainer.style.transform = 'translateX(-50%) rotate(0deg)';
            bagContainer.classList.add('revealed'); // Keep revealed state visible on release

            document.removeEventListener('touchmove', onBagTouchMove);
            document.removeEventListener('touchend', onBagTouchEnd);

            clearTimeout(bagTimeout);
            bagTimeout = setTimeout(() => {
                if (!isDraggingBag) {
                    bagContainer.style.bottom = '-210px';
                    bagContainer.classList.remove('revealed');
                }
            }, 1500);
        };

        bagContainer.addEventListener('mousedown', onBagMouseDown);
        bagContainer.addEventListener('touchstart', onBagTouchStart, { passive: false });
    };

    // 10. Initialise Event Bindings
    const init = () => {
        detectPrefix();
        injectStyles();

        const isSketchPage = document.querySelector('.sketch-content') !== null;

        if (isSketchPage) {
            // Bind drag-and-drop globally to allow collecting items on all project pages
            document.addEventListener('mousedown', onMouseDown);
            document.addEventListener('touchstart', onTouchStart, { passive: false });
            
            // Prevent default native browser image dragging (which triggers ghost image/outline)
            document.addEventListener('dragstart', (e) => {
                if (e.target.closest('.deco-img')) {
                    e.preventDefault();
                }
            });

            // Progression check: Remove collected items so they don't reappear on reload
            let collected = [];
            try {
                collected = JSON.parse(localStorage.getItem('collected_objects')) || [];
            } catch(e) {
                collected = [];
            }

            const docImgs = document.querySelectorAll('.deco-img');
            docImgs.forEach(img => {
                if (img.id !== 'leaf-blower' && img.id !== 'drag-basket-img') {
                    const src = img.getAttribute('src') || '';
                    const filename = src.substring(src.lastIndexOf('/') + 1);
                    const isCollected = collected.some(item => {
                        const itemFile = item.filename || '';
                        return itemFile.toLowerCase() === filename.toLowerCase();
                    });
                    
                    if (isCollected) {
                        img.remove();
                    } else {
                        bindEventsToElement(img);
                    }
                }
            });

            initBasket();
            initLeafBlower();
            checkAndSpawnRareItems();
            initShakeBag();
            console.log('[Layout Editor] Direct manipulation gestures with leaf-blowing physics activated!');
        }

        // Audio player on all pages
        initAudioPlayer();

        // Add the Hand UI on all pages (gallery home page and project sketch pages)
        const isSecretCollectionPage = window.location.pathname.includes('secret-collection.html');
        if (!isSecretCollectionPage) {
            initHandIndicator();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
