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

    // Generate variation list
    const assetPool = [];
    baseAssets.forEach(base => {
        assetPool.push(base);
        assetPool.push(base.replace('.png', '_h.png'));
        assetPool.push(base.replace('.png', '_v.png'));
        assetPool.push(base.replace('.png', '_hv.png'));
    });

    // 2. Inject CSS styles for editor visual feedback
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        /* Interactive dragging states */
        .deco-img {
            cursor: grab !important;
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease, filter 0.4s ease, outline 0.2s !important;
        }
        .deco-img:hover {
            outline: 2px dashed #2274a5 !important;
            outline-offset: 4px !important;
            cursor: grab !important;
        }
        .deco-img.dragging {
            cursor: grabbing !important;
            opacity: 0.85 !important;
            outline: 2px dashed #2ecc71 !important;
            outline-offset: 6px !important;
            transition: none !important;
        }
        
        /* Empty space helper hint */
        .sketch-content.edit-hint {
            outline: 2px dashed rgba(34, 116, 165, 0.15);
            outline-offset: 10px;
        }
    `;
    document.head.appendChild(styleEl);

    // 3. State Management
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
    detectPrefix();

    // 4. Drag & Drop Implementation
    let activeDragEl = null;
    let startX = 0, startY = 0;
    let elemStartX = 0, elemStartY = 0;
    let contentRect = null;

    const onMouseDown = (e) => {
        const img = e.target.closest('.deco-img');
        if (!img) return;

        e.preventDefault();
        activeDragEl = img;
        activeDragEl.classList.add('dragging');

        const contentContainer = document.querySelector('.sketch-content');
        contentRect = contentContainer ? contentContainer.getBoundingClientRect() : document.body.getBoundingClientRect();

        startX = e.clientX;
        startY = e.clientY;

        elemStartX = parseInt(activeDragEl.style.left, 10);
        elemStartY = parseInt(activeDragEl.style.top, 10);

        if (isNaN(elemStartX)) {
            const imgRect = activeDragEl.getBoundingClientRect();
            elemStartX = imgRect.left - contentRect.left;
            elemStartY = imgRect.top - contentRect.top;
        }

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
    };

    const onMouseUp = () => {
        if (activeDragEl) {
            activeDragEl.classList.remove('dragging');
            activeDragEl = null;
            debouncedSave(); // Auto-save on drag end
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    // Touch Support for Mobile Dragging
    const onTouchStart = (e) => {
        const img = e.target.closest('.deco-img');
        if (!img) return;

        e.preventDefault();
        activeDragEl = img;
        activeDragEl.classList.add('dragging');

        const contentContainer = document.querySelector('.sketch-content');
        contentRect = contentContainer ? contentContainer.getBoundingClientRect() : document.body.getBoundingClientRect();

        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;

        elemStartX = parseInt(activeDragEl.style.left, 10);
        elemStartY = parseInt(activeDragEl.style.top, 10);

        if (isNaN(elemStartX)) {
            const imgRect = activeDragEl.getBoundingClientRect();
            elemStartX = imgRect.left - contentRect.left;
            elemStartY = imgRect.top - contentRect.top;
        }

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
    };

    const onTouchEnd = () => {
        if (activeDragEl) {
            activeDragEl.classList.remove('dragging');
            activeDragEl = null;
            debouncedSave();
        }
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    };

    // 5. Scroll Wheel to Rotate / Scale
    const onWheel = (e) => {
        const img = e.target.closest('.deco-img');
        if (!img) return;

        e.preventDefault(); // Stop normal scroll

        const styleStr = img.getAttribute('style') || '';

        // Case A: Shift is pressed -> Resize/Scale
        if (e.shiftKey) {
            let width = img.clientWidth || parseInt(img.style.width, 10) || 100;
            const delta = e.deltaY > 0 ? 5 : -5;
            width = Math.max(40, Math.min(300, width + delta));
            img.style.width = width + 'px';
        }
        // Case B: No modifier -> Rotate
        else {
            let rotation = 0;
            const rotMatch = styleStr.match(/--deco-rotation:\s*(-?\d+)deg/);
            if (rotMatch) {
                rotation = parseInt(rotMatch[1], 10);
            }
            const delta = e.deltaY > 0 ? 5 : -5;
            rotation = (rotation + delta) % 360;
            img.style.setProperty('--deco-rotation', rotation + 'deg');
        }

        debouncedSave(); // Auto-save changes
    };

    // 6. Hover Track (For Keybinds like Delete)
    const onMouseEnter = (e) => {
        hoveredEl = e.target.closest('.deco-img');
    };
    const onMouseLeave = () => {
        hoveredEl = null;
    };

    // Keydown to Delete (Delete / Backspace)
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
        if (img) {
            e.preventDefault();
            img.remove();
            debouncedSave();
            showToast('Decoration deleted!');
        }
    });

    // 7. Double-click Empty Space to Add Decoration
    document.addEventListener('dblclick', (e) => {
        // Prevent if double-clicking a stamp or interactive sheet
        if (e.target.closest('.deco-img') || e.target.closest('.sketch-code-panel') || e.target.closest('.sketch-screenshot-panel') || e.target.closest('.sketch-description-panel') || e.target.closest('.back-link') || e.target.closest('.flip-interactive') || e.target.closest('.words-interactive') || e.target.closest('.typoexp-interactive')) {
            return;
        }

        const contentContainer = document.querySelector('.sketch-content');
        if (!contentContainer) return;

        // Verify click is inside the grid wrapper
        const rect = contentContainer.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
            e.preventDefault();

            // Calculate local relative click position
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            // Spawn new stamp
            const newImg = document.createElement('img');
            newImg.className = 'deco-img deco-pos-custom';
            
            // Choose random stamp from pool
            const randAsset = assetPool[Math.floor(Math.random() * assetPool.length)];
            newImg.setAttribute('src', assetPrefix + randAsset);
            
            // Set styles at click coordinates
            const randRot = Math.floor(Math.random() * 40) - 20;
            newImg.setAttribute('style', `--deco-rotation: ${randRot}deg; width: 100px; top: ${Math.floor(clickY - 50)}px; left: ${Math.floor(clickX - 50)}px; z-index: 1;`);
            newImg.setAttribute('alt', '');
            newImg.setAttribute('aria-hidden', 'true');

            // Inject and bind events
            contentContainer.insertBefore(newImg, contentContainer.firstChild);
            bindEventsToElement(newImg);

            debouncedSave();
            flashElement(newImg);
            showToast('New decoration added!');
        }
    });

    // 8. Bind all events to an element
    const bindEventsToElement = (el) => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
        el.addEventListener('wheel', onWheel, { passive: false });
    };

    // 9. Save Layout changes to disk via Node dev server
    const debouncedSave = () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(saveLayoutToDisk, 500); // 500ms debounce to avoid rapid disk writes on scroll
    };

    const saveLayoutToDisk = () => {
        const docImgs = document.querySelectorAll('.deco-img');
        let htmlLines = ['        <!-- Background collage decorations (behind papers) -->'];

        docImgs.forEach(img => {
            const src = img.getAttribute('src') || '';
            const filename = src.substring(src.lastIndexOf('/') + 1);
            
            // Extract class
            let cls = 'deco-img';
            const classes = img.className.split(' ');
            const posClass = classes.find(c => c.startsWith('deco-pos-'));
            if (posClass) {
                cls += ' ' + posClass;
            } else {
                cls += ' deco-pos-custom';
            }

            // Extract styles
            const styleStr = img.getAttribute('style') || '';
            
            // Extract rotation
            let rotation = 0;
            const rotMatch = styleStr.match(/--deco-rotation:\s*(-?\d+)deg/);
            if (rotMatch) rotation = parseInt(rotMatch[1], 10);
            
            // Extract width
            let width = img.style.width || img.clientWidth || 100;
            if (typeof width === 'string' && width.endsWith('px')) {
                width = parseInt(width, 10);
            }
            
            // Extract positions
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
        // Remove existing toast if present
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

    // 10. Initialise Event Bindings
    const init = () => {
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('touchstart', onTouchStart, { passive: false });
        
        const docImgs = document.querySelectorAll('.deco-img');
        docImgs.forEach(img => {
            bindEventsToElement(img);
        });

        console.log('[Layout Editor] Gestures initialized. Drag, wheel scroll to rotate/scale, dblclick/Backspace to delete, dblclick background to add!');
    };

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
