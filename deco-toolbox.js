(function() {
    // 1. Define the base decoration assets
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

    // Generate all 140 variations (normal, _h, _v, _hv)
    const assetPool = [];
    baseAssets.forEach(base => {
        assetPool.push(base);
        assetPool.push(base.replace('.png', '_h.png'));
        assetPool.push(base.replace('.png', '_v.png'));
        assetPool.push(base.replace('.png', '_hv.png'));
    });
    assetPool.sort();

    // 2. Inject Toolbox Styles
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        /* Toolbox UI Panel */
        #deco-editor-toggle {
            position: fixed;
            bottom: 25px;
            right: 25px;
            z-index: 100000;
            background: #131b23;
            color: #e9f1f7;
            border: 1px solid rgba(255,255,255,0.15);
            padding: 12px 20px;
            border-radius: 30px;
            font-family: 'Outfit', sans-serif;
            font-size: 0.95rem;
            font-weight: 500;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        #deco-editor-toggle:hover {
            transform: scale(1.05) translateY(-2px);
            background: #2274a5;
            box-shadow: 0 12px 28px rgba(34,116,165,0.4);
        }

        #deco-editor-panel {
            position: fixed;
            top: 25px;
            right: 25px;
            bottom: 95px;
            width: 360px;
            z-index: 99999;
            background: rgba(19, 27, 35, 0.88);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
            color: #e9f1f7;
            font-family: 'Outfit', sans-serif;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: translateX(410px);
            transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        #deco-editor-panel.open {
            transform: translateX(0);
        }

        .deco-ed-header {
            padding: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .deco-ed-header h3 {
            margin: 0;
            font-weight: 400;
            font-size: 1.2rem;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .deco-ed-close {
            background: transparent;
            border: none;
            color: #e9f1f7;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
            padding: 0;
            line-height: 1;
        }
        .deco-ed-close:hover {
            opacity: 1;
        }

        .deco-ed-body {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .deco-ed-section {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 8px;
            padding: 15px;
        }

        .deco-ed-toggle-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .deco-ed-toggle-row span {
            font-weight: 500;
            font-size: 0.95rem;
        }

        /* Switch toggle style */
        .deco-switch {
            position: relative;
            display: inline-block;
            width: 48px;
            height: 24px;
        }
        .deco-switch input { 
            opacity: 0;
            width: 0;
            height: 0;
        }
        .deco-slider {
            position: absolute;
            cursor: pointer;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(255,255,255,0.15);
            transition: .3s;
            border-radius: 24px;
        }
        .deco-slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .3s;
            border-radius: 50%;
        }
        input:checked + .deco-slider {
            background-color: #2274a5;
        }
        input:checked + .deco-slider:before {
            transform: translateX(24px);
        }

        .deco-ed-list-title {
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: rgba(233,241,247,0.5);
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .deco-item-editor {
            border: 1px solid rgba(255,255,255,0.06);
            background: rgba(255,255,255,0.02);
            border-radius: 8px;
            margin-bottom: 12px;
            overflow: hidden;
            transition: border-color 0.3s;
        }
        .deco-item-editor.active {
            border-color: #2274a5;
            background: rgba(34,116,165,0.05);
        }
        .deco-item-title {
            padding: 10px 15px;
            background: rgba(255,255,255,0.04);
            font-size: 0.85rem;
            font-weight: 500;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
        }
        .deco-item-controls {
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            border-top: 1px solid rgba(255,255,255,0.04);
        }
        .deco-control-group {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .deco-control-group label {
            font-size: 0.8rem;
            color: rgba(233,241,247,0.6);
            display: flex;
            justify-content: space-between;
        }
        .deco-control-group select, 
        .deco-control-group input[type="range"],
        .deco-control-group input[type="number"] {
            background: rgba(19,27,35,0.6);
            border: 1px solid rgba(255,255,255,0.1);
            color: #e9f1f7;
            padding: 6px;
            border-radius: 4px;
            font-family: 'Outfit', sans-serif;
            font-size: 0.85rem;
            width: 100%;
            box-sizing: border-box;
        }
        .deco-control-group select option {
            background: #131b23;
        }
        .deco-control-group input[type="range"] {
            -webkit-appearance: none;
            height: 6px;
            background: rgba(255,255,255,0.1);
            border-radius: 3px;
            padding: 0;
        }
        .deco-control-group input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #2274a5;
            cursor: pointer;
        }

        .deco-btn-row {
            display: flex;
            gap: 8px;
            margin-top: 5px;
        }
        .deco-btn {
            flex: 1;
            padding: 8px;
            font-family: 'Outfit', sans-serif;
            font-size: 0.8rem;
            font-weight: 500;
            border-radius: 4px;
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.05);
            color: #e9f1f7;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .deco-btn:hover {
            background: rgba(255,255,255,0.15);
        }
        .deco-btn.danger {
            background: rgba(235,94,85,0.15);
            border-color: rgba(235,94,85,0.3);
            color: #ff6b6b;
        }
        .deco-btn.danger:hover {
            background: rgba(235,94,85,0.3);
        }
        .deco-btn.primary {
            background: #2274a5;
            border-color: #2274a5;
        }
        .deco-btn.primary:hover {
            background: #2884bc;
        }

        .deco-ed-footer {
            padding: 15px 20px;
            border-top: 1px solid rgba(255,255,255,0.08);
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        /* Editor Highlight Overlay on decoration items */
        .deco-img.edit-highlight {
            outline: 2px dashed #ff4a4a !important;
            outline-offset: 4px !important;
            cursor: move !important;
            opacity: 0.9 !important;
            transition: none !important;
        }
        .deco-img.edit-highlight:hover {
            transform: rotate(var(--deco-rotation, 0deg)) scale(1) !important; /* disable default scale transition */
        }
        .deco-img.edit-active-drag {
            opacity: 0.5 !important;
            outline-color: #2274a5 !important;
        }

        /* Modal Overlay for Code Output */
        #deco-modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(4px);
            z-index: 1000000;
            display: none;
            align-items: center;
            justify-content: center;
            font-family: 'Outfit', sans-serif;
        }
        #deco-modal {
            background: #131b23;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            width: 90%;
            max-width: 650px;
            padding: 25px;
            box-shadow: 0 25px 60px rgba(0,0,0,0.5);
            color: #e9f1f7;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        #deco-modal h4 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 500;
        }
        #deco-modal textarea {
            width: 100%;
            height: 250px;
            background: rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 6px;
            padding: 12px;
            font-family: monospace;
            font-size: 0.85rem;
            color: #a7d0e4;
            resize: none;
            box-sizing: border-box;
        }
    `;
    document.head.appendChild(styleEl);

    // 3. Inject Toolbox HTML Structure
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'deco-editor-toggle';
    toggleBtn.innerHTML = '🛠️ Layout Editor';
    document.body.appendChild(toggleBtn);

    const panelEl = document.createElement('div');
    panelEl.id = 'deco-editor-panel';
    panelEl.innerHTML = `
        <div class="deco-ed-header">
            <h3>Collage Editor</h3>
            <button class="deco-ed-close" title="Close Panel">×</button>
        </div>
        <div class="deco-ed-body">
            <div class="deco-ed-section deco-ed-toggle-row">
                <span>Enable Drag Mode</span>
                <label class="deco-switch">
                    <input type="checkbox" id="deco-drag-toggle">
                    <span class="deco-slider"></span>
                </label>
            </div>
            
            <div>
                <div class="deco-ed-list-title">
                    <span>Active Decorations</span>
                </div>
                <div id="deco-items-list">
                    <!-- Dynamic List of Items -->
                </div>
            </div>
        </div>
        <div class="deco-ed-footer">
            <button class="deco-btn primary" id="deco-add-btn">+ Add Decoration</button>
            <button class="deco-btn" id="deco-save-btn" style="background:#2ecc71; border-color:#27ae60; font-weight:600; color:white;">💾 Save Layout</button>
        </div>
    `;
    document.body.appendChild(panelEl);

    // Code Output Modal
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'deco-modal-overlay';
    modalOverlay.innerHTML = `
        <div id="deco-modal">
            <h4>Generated Decoration HTML</h4>
            <p style="margin:0; font-size:0.85rem; color:rgba(233,241,247,0.6);">Replace the corresponding decoration block in your HTML file with this updated output:</p>
            <textarea id="deco-modal-code" readonly></textarea>
            <div style="display:flex; justify-content:flex-end; gap:10px;">
                <button class="deco-btn" id="deco-modal-copy">Copy to Clipboard</button>
                <button class="deco-btn" id="deco-modal-close" style="max-width:80px;">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    // 4. State Management
    let dragModeActive = false;
    let items = [];
    let assetPrefix = '../../assets/'; // default, will auto-detect

    // Try to auto-detect asset prefix from existing images on page load
    const detectPrefix = () => {
        const firstDeco = document.querySelector('.deco-img');
        if (firstDeco) {
            const src = firstDeco.getAttribute('src') || '';
            const idx = src.lastIndexOf('assets/');
            if (idx !== -1) {
                assetPrefix = src.substring(0, idx + 7); // e.g. '../../assets/' or '../assets/'
            }
        }
    };
    detectPrefix();

    // 5. Gather Existing Decorations and Wrap Them
    const refreshDecorationsList = () => {
        const docImgs = document.querySelectorAll('.deco-img');
        items = [];
        
        docImgs.forEach((img, idx) => {
            // Assign index if not present
            if (!img.dataset.decoId) {
                img.dataset.decoId = 'deco-' + Date.now() + '-' + idx;
            }
            
            const id = img.dataset.decoId;
            const src = img.getAttribute('src') || '';
            const filename = src.substring(src.lastIndexOf('/') + 1);
            
            // Extract inline styles
            const styleStr = img.getAttribute('style') || '';
            
            // Extract rotation from CSS variable `--deco-rotation`
            let rotation = 0;
            const rotMatch = styleStr.match(/--deco-rotation:\s*(-?\d+)deg/);
            if (rotMatch) {
                rotation = parseInt(rotMatch[1], 10);
            }
            
            // Extract width
            let width = img.clientWidth || parseInt(img.style.width, 10) || 100;
            const widthMatch = styleStr.match(/width:\s*(\d+)px/);
            if (widthMatch) {
                width = parseInt(widthMatch[1], 10);
            }

            // Extract z-index
            let zIndex = img.style.zIndex || getComputedStyle(img).zIndex || 1;
            if (zIndex === 'auto' || isNaN(zIndex)) zIndex = 1;
            
            items.push({
                id: id,
                element: img,
                filename: filename,
                rotation: rotation,
                width: width,
                zIndex: parseInt(zIndex, 10)
            });
        });

        renderListUI();
        updateEditorHighlightClasses();
    };

    // 6. Render the Sidebar List UI
    const renderListUI = () => {
        const container = document.getElementById('deco-items-list');
        container.innerHTML = '';

        if (items.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding:20px; color:rgba(233,241,247,0.4); font-size:0.9rem;">No decorations active.</div>';
            return;
        }

        items.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'deco-item-editor';
            itemDiv.dataset.itemId = item.id;

            // Generate asset options dropdown
            let options = '';
            assetPool.forEach(asset => {
                const selected = asset === item.filename ? 'selected' : '';
                options += `<option value="${asset}" ${selected}>${asset}</option>`;
            });

            itemDiv.innerHTML = `
                <div class="deco-item-title">
                    <span>Decoration #${index + 1} (${item.filename.substring(0, 15)}...)</span>
                    <span style="font-size:0.75rem; color:#2274a5;">Edit ▾</span>
                </div>
                <div class="deco-item-controls" style="display: none;">
                    <div class="deco-control-group">
                        <label>Asset Image</label>
                        <select class="ctrl-asset-select">
                            ${options}
                        </select>
                    </div>
                    <div class="deco-control-group">
                        <label>
                            <span>Width</span>
                            <span class="ctrl-width-val">${item.width}px</span>
                        </label>
                        <input type="range" class="ctrl-width-slider" min="40" max="300" value="${item.width}">
                    </div>
                    <div class="deco-control-group">
                        <label>
                            <span>Rotation</span>
                            <span class="ctrl-rot-val">${item.rotation}°</span>
                        </label>
                        <input type="range" class="ctrl-rot-slider" min="-180" max="180" value="${item.rotation}">
                    </div>
                    <div class="deco-control-group">
                        <label>Layer (z-index)</label>
                        <input type="number" class="ctrl-z-input" min="1" max="100" value="${item.zIndex}">
                    </div>
                    <div class="deco-btn-row">
                        <button class="deco-btn ctrl-flash-btn">🔍 Flash</button>
                        <button class="deco-btn danger ctrl-delete-btn">🗑️ Delete</button>
                    </div>
                </div>
            `;

            // Bind Event Listeners
            const title = itemDiv.querySelector('.deco-item-title');
            const controls = itemDiv.querySelector('.deco-item-controls');
            
            title.addEventListener('click', () => {
                const isOpen = controls.style.display !== 'none';
                // Close all other controls first
                document.querySelectorAll('.deco-item-controls').forEach(el => el.style.display = 'none');
                document.querySelectorAll('.deco-item-editor').forEach(el => el.classList.remove('active'));
                
                if (!isOpen) {
                    controls.style.display = 'flex';
                    itemDiv.classList.add('active');
                    item.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    flashElement(item.element);
                }
            });

            // Asset Select Change Handler
            const assetSelect = itemDiv.querySelector('.ctrl-asset-select');
            assetSelect.addEventListener('change', (e) => {
                const newVal = e.target.value;
                item.filename = newVal;
                item.element.setAttribute('src', assetPrefix + newVal);
                title.querySelector('span').textContent = `Decoration #${index + 1} (${newVal.substring(0, 15)}...)`;
            });

            // Width Slider Handler
            const widthSlider = itemDiv.querySelector('.ctrl-width-slider');
            const widthValText = itemDiv.querySelector('.ctrl-width-val');
            widthSlider.addEventListener('input', (e) => {
                const width = e.target.value;
                item.width = width;
                widthValText.textContent = width + 'px';
                item.element.style.width = width + 'px';
            });

            // Rotation Slider Handler
            const rotSlider = itemDiv.querySelector('.ctrl-rot-slider');
            const rotValText = itemDiv.querySelector('.ctrl-rot-val');
            rotSlider.addEventListener('input', (e) => {
                const rot = e.target.value;
                item.rotation = rot;
                rotValText.textContent = rot + '°';
                item.element.style.setProperty('--deco-rotation', rot + 'deg');
            });

            // Z-index input handler
            const zInput = itemDiv.querySelector('.ctrl-z-input');
            zInput.addEventListener('change', (e) => {
                const z = parseInt(e.target.value, 10) || 1;
                item.zIndex = z;
                item.element.style.zIndex = z;
            });

            // Flash element button
            itemDiv.querySelector('.ctrl-flash-btn').addEventListener('click', () => {
                flashElement(item.element);
            });

            // Delete button handler
            itemDiv.querySelector('.ctrl-delete-btn').addEventListener('click', () => {
                if (confirm('Delete this decoration?')) {
                    item.element.remove();
                    refreshDecorationsList();
                }
            });

            container.appendChild(itemDiv);
        });
    };

    // Flash/Highlight target element on screen
    const flashElement = (el) => {
        let originalOutline = el.style.outline;
        let originalTransition = el.style.transition;
        el.style.transition = 'none';
        el.style.outline = '4px solid #2274a5';
        el.style.outlineOffset = '6px';
        
        setTimeout(() => {
            el.style.transition = 'outline 0.5s ease';
            el.style.outline = originalOutline || 'none';
            setTimeout(() => {
                el.style.transition = originalTransition;
            }, 500);
        }, 600);
    };

    // Update hover classes depending on Edit Mode active state
    const updateEditorHighlightClasses = () => {
        items.forEach(item => {
            if (dragModeActive) {
                item.element.classList.add('edit-highlight');
            } else {
                item.element.classList.remove('edit-highlight');
                item.element.classList.remove('edit-active-drag');
            }
        });
    };

    // 7. Drag and Drop Logic (relative positioning inside .sketch-content)
    let activeDragEl = null;
    let startX = 0, startY = 0;
    let elemStartX = 0, elemStartY = 0;
    let contentRect = null;

    document.addEventListener('mousedown', (e) => {
        if (!dragModeActive) return;
        
        // Check if we clicked a decoration image
        const img = e.target.closest('.deco-img');
        if (!img) return;

        e.preventDefault();
        activeDragEl = img;
        activeDragEl.classList.add('edit-active-drag');

        // Locate content container for relative positioning
        const contentContainer = document.querySelector('.sketch-content');
        if (contentContainer) {
            contentRect = contentContainer.getBoundingClientRect();
        } else {
            contentRect = document.body.getBoundingClientRect();
        }

        // Get starting coordinates
        startX = e.clientX;
        startY = e.clientY;

        // Extract style values
        elemStartX = parseInt(activeDragEl.style.left, 10);
        elemStartY = parseInt(activeDragEl.style.top, 10);

        // Fallback if not absolute positioned yet or has right positioning
        if (isNaN(elemStartX)) {
            // Get position relative to content container
            const imgRect = activeDragEl.getBoundingClientRect();
            elemStartX = imgRect.left - contentRect.left;
            elemStartY = imgRect.top - contentRect.top;
        }

        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragEnd);
    });

    const onDragMove = (e) => {
        if (!activeDragEl || !contentRect) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let newLeft = elemStartX + deltaX;
        let newTop = elemStartY + deltaY;

        activeDragEl.style.left = newLeft + 'px';
        activeDragEl.style.top = newTop + 'px';
        activeDragEl.style.right = 'auto'; // override default right/bottom styles
        activeDragEl.style.bottom = 'auto';

        // Find match in items state and update inputs in real-time
        const match = items.find(item => item.element === activeDragEl);
        if (match) {
            // Highlight the corresponding sidebar card
            const card = document.querySelector(`.deco-item-editor[data-item-id="${match.id}"]`);
            if (card && card.classList.contains('active')) {
                // If the details are open, we don't do anything, but let's keep details updated
            }
        }
    };

    const onDragEnd = () => {
        if (activeDragEl) {
            activeDragEl.classList.remove('edit-active-drag');
            activeDragEl = null;
            refreshDecorationsList(); // refresh list to capture final top/left values
        }
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragEnd);
    };

    // Support touch devices for dragging
    document.addEventListener('touchstart', (e) => {
        if (!dragModeActive) return;
        const img = e.target.closest('.deco-img');
        if (!img) return;

        e.preventDefault();
        activeDragEl = img;
        activeDragEl.classList.add('edit-active-drag');

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
    }, { passive: false });

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
            activeDragEl.classList.remove('edit-active-drag');
            activeDragEl = null;
            refreshDecorationsList();
        }
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    };

    // 8. Add New Decoration Button Logic
    document.getElementById('deco-add-btn').addEventListener('click', () => {
        const contentContainer = document.querySelector('.sketch-content');
        if (!contentContainer) {
            alert('Cannot find .sketch-content container to add decorations to!');
            return;
        }

        // Create new image
        const newImg = document.createElement('img');
        newImg.className = 'deco-img deco-pos-1'; // default pos
        
        // Grab a random stamp from the pool
        const randAsset = assetPool[Math.floor(Math.random() * assetPool.length)];
        newImg.setAttribute('src', assetPrefix + randAsset);
        
        // Default styling
        newImg.setAttribute('style', '--deco-rotation: 0deg; width: 100px; top: 100px; left: 100px; z-index: 1;');
        newImg.setAttribute('alt', '');
        newImg.setAttribute('aria-hidden', 'true');
        
        // Injects right inside sketch-content
        contentContainer.insertBefore(newImg, contentContainer.firstChild);

        // Flash & Refresh
        setTimeout(() => {
            refreshDecorationsList();
            flashElement(newImg);
            // Open controls of this new image (it will be the last or first)
            const id = newImg.dataset.decoId;
            const newCard = document.querySelector(`.deco-item-editor[data-item-id="${id}"]`);
            if (newCard) {
                newCard.querySelector('.deco-item-title').click();
            }
        }, 100);
    });

    // 9. Save and Overwrite layout on disk via Node Server
    document.getElementById('deco-save-btn').addEventListener('click', () => {
        const saveBtn = document.getElementById('deco-save-btn');
        const originalText = saveBtn.innerHTML;
        saveBtn.disabled = true;
        saveBtn.innerHTML = '💾 Saving...';

        const docImgs = document.querySelectorAll('.deco-img');
        let htmlLines = ['        <!-- Background collage decorations (behind papers) -->'];

        docImgs.forEach(img => {
            const src = img.getAttribute('src') || '';
            const filename = src.substring(src.lastIndexOf('/') + 1);
            
            // Re-detect classes
            let cls = 'deco-img';
            const classes = img.className.split(' ');
            const posClass = classes.find(c => c.startsWith('deco-pos-'));
            if (posClass) {
                cls += ' ' + posClass;
            } else {
                cls += ' deco-pos-custom';
            }

            // Style parameters
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
            
            if (img.style.left) {
                leftStyle = `left: ${img.style.left}; `;
            }
            if (img.style.right) {
                rightStyle = `right: ${img.style.right}; `;
            }
            if (img.style.top) {
                topStyle = `top: ${img.style.top}; `;
            }
            if (img.style.bottom) {
                bottomStyle = `bottom: ${img.style.bottom}; `;
            }

            const zIndexStr = img.style.zIndex ? `z-index: ${img.style.zIndex}; ` : '';
            
            const fullStyleStr = `--deco-rotation: ${rotation}deg; width: ${width}px; ${topStyle}${bottomStyle}${leftStyle}${rightStyle}${zIndexStr}`.trim();
            
            htmlLines.push(`        <img src="\${prefix}${filename}" class="${cls}" style="${fullStyleStr}" alt="" aria-hidden="true">`);
        });

        const finalCode = htmlLines.join('\n');
        
        // Compute relative filepath
        let relativePath = decodeURIComponent(window.location.pathname);
        if (relativePath.startsWith('/')) {
            relativePath = relativePath.substring(1);
        }
        if (!relativePath) {
            relativePath = 'index.html'; // fallback
        }

        // Send POST request to dev server
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
                showToast('Layout overwritten on disk successfully!');
            } else {
                throw new Error('Save failed');
            }
        })
        .catch(err => {
            console.error(err);
            alert('Failed to save layout: ' + err.message + '\n\nMake sure you are running the project using `node server.js` and not a standard web server.');
        })
        .finally(() => {
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalText;
        });
    });

    // Helper to show a toast message
    const showToast = (msg) => {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        toast.style.background = '#2ecc71';
        toast.style.color = 'white';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '30px';
        toast.style.fontFamily = "'Outfit', sans-serif";
        toast.style.fontSize = '0.95rem';
        toast.style.fontWeight = '500';
        toast.style.boxShadow = '0 10px 30px rgba(46, 204, 113, 0.4)';
        toast.style.zIndex = '1000000';
        toast.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        toast.innerText = msg;

        document.body.appendChild(toast);
        
        // Trigger slide up
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);

        // Slide down and remove
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 3000);
    };

    // 10. Sidebar Toggle and Panel Toggle Controls
    toggleBtn.addEventListener('click', () => {
        panelEl.classList.toggle('open');
    });

    document.querySelector('.deco-ed-close').addEventListener('click', () => {
        panelEl.classList.remove('open');
    });

    document.getElementById('deco-drag-toggle').addEventListener('change', (e) => {
        dragModeActive = e.target.checked;
        updateEditorHighlightClasses();
    });

    // 11. Initial Scan
    setTimeout(() => {
        refreshDecorationsList();
    }, 500);

})();
