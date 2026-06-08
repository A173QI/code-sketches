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

    const detectPrefix = () => {
        const firstDeco = document.querySelector('.deco-img');
        if (firstDeco) {
            const src = firstDeco.getAttribute('src') || '';
            const idx = src.lastIndexOf('assets/');
            if (idx !== -1) {
                assetPrefix = src.substring(0, idx + 7);
            }
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
        `;
        document.head.appendChild(styleEl);
    };

    // 4. Drag & Drop Implementation (Fixing Jump bug)
    let activeDragEl = null;
    let startX = 0, startY = 0;
    let elemStartX = 0, elemStartY = 0;
    let contentRect = null;

    const onMouseDown = (e) => {
        const img = e.target.closest('.deco-img');
        if (!img || img.id === 'drag-basket-img') return;

        e.preventDefault();

        if (img.id === 'leaf-blower') {
            activeDragEl = document.getElementById('leaf-blower-container');
            activeDragEl.classList.add('dragging');
            const rect = activeDragEl.getBoundingClientRect();
            elemStartX = rect.left;
            elemStartY = rect.top;
        } else {
            activeDragEl = img;
            activeDragEl.classList.add('dragging');
            
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

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let newLeft = elemStartX + deltaX;
        let newTop = elemStartY + deltaY;

        activeDragEl.style.left = newLeft + 'px';
        activeDragEl.style.top = newTop + 'px';
        activeDragEl.style.right = 'auto';
        activeDragEl.style.bottom = 'auto';

        // Check if cursor is over basket (only for stamps!)
        if (activeDragEl.id !== 'leaf-blower-container') {
            const basket = document.getElementById('drag-basket-container');
            if (basket) {
                const bRect = basket.getBoundingClientRect();
                if (e.clientX >= bRect.left && e.clientX <= bRect.right && e.clientY >= bRect.top && e.clientY <= bRect.bottom) {
                    basket.classList.add('drag-over');
                } else {
                    basket.classList.remove('drag-over');
                }
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
                return;
            }

            const basket = document.getElementById('drag-basket-container');
            let putInBasket = false;
            if (basket) {
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

    // Touch Support for Mobile Dragging (Fixing Jump bug)
    const onTouchStart = (e) => {
        const img = e.target.closest('.deco-img');
        if (!img || img.id === 'drag-basket-img') return;

        e.preventDefault();

        if (img.id === 'leaf-blower') {
            activeDragEl = document.getElementById('leaf-blower-container');
            activeDragEl.classList.add('dragging');
            const rect = activeDragEl.getBoundingClientRect();
            elemStartX = rect.left;
            elemStartY = rect.top;
        } else {
            activeDragEl = img;
            activeDragEl.classList.add('dragging');
            
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
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;

        let newLeft = elemStartX + deltaX;
        let newTop = elemStartY + deltaY;

        activeDragEl.style.left = newLeft + 'px';
        activeDragEl.style.top = newTop + 'px';
        activeDragEl.style.right = 'auto';
        activeDragEl.style.bottom = 'auto';

        // Check if touch is over basket (only for stamps!)
        if (activeDragEl.id !== 'leaf-blower-container') {
            const basket = document.getElementById('drag-basket-container');
            if (basket) {
                const bRect = basket.getBoundingClientRect();
                if (touch.clientX >= bRect.left && touch.clientX <= bRect.right && touch.clientY >= bRect.top && touch.clientY <= bRect.bottom) {
                    basket.classList.add('drag-over');
                } else {
                    basket.classList.remove('drag-over');
                }
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
                return;
            }

            const basket = document.getElementById('drag-basket-container');
            let putInBasket = false;
            if (basket) {
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
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        toast.style.background = 'rgba(19, 27, 35, 0.9)';
        toast.style.backdropFilter = 'blur(10px)';
        toast.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        toast.style.color = '#e9f1f7';
        toast.style.padding = '10px 24px';
        toast.style.borderRadius = '30px';
        toast.style.fontFamily = "'Outfit', sans-serif";
        toast.style.fontSize = '0.9rem';
        toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
        toast.style.zIndex = '1000000';
        toast.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        toast.innerText = msg;

        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 50);

        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 2200);
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
            label.style.display = 'block';
            label.style.left = e.clientX + 'px';
            label.style.top = e.clientY + 'px';
        });

        blowerContainer.addEventListener('mouseleave', () => {
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

        const runBlowingLoop = () => {
            if (!isBlowing) return;

            const blowerRect = blower.getBoundingClientRect();
            const contentContainer = document.querySelector('.sketch-content');
            if (!contentContainer) {
                blowingLoopId = requestAnimationFrame(runBlowingLoop);
                return;
            }
            const cRect = contentContainer.getBoundingClientRect();

            // The nozzle of the leaf blower is at the top-left corner of the blower image
            const bx = blowerRect.left;
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

        blowerContainer.addEventListener('mouseenter', startBlowing);
        blowerContainer.addEventListener('mouseleave', stopBlowing);
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

    // 10. Initialise Event Bindings
    const init = () => {
        detectPrefix();
        injectStyles();

        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('touchstart', onTouchStart, { passive: false });
        
        // Prevent default native browser image dragging (which triggers ghost image/outline)
        document.addEventListener('dragstart', (e) => {
            if (e.target.closest('.deco-img')) {
                e.preventDefault();
            }
        });

        const docImgs = document.querySelectorAll('.deco-img');
        docImgs.forEach(img => {
            if (img.id !== 'leaf-blower' && img.id !== 'drag-basket-img') {
                bindEventsToElement(img);
            }
        });

        initBasket();
        initLeafBlower();
        console.log('[Layout Editor] Direct manipulation gestures with leaf-blowing physics activated!');
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
