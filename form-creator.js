(function () {
  'use strict';

  // ========== CSS Injection ==========
  function injectStyles() {
    if (document.getElementById('fc-styles')) return;

    const style = document.createElement('style');
    style.id = 'fc-styles';
    style.textContent = `
.form-creator {
  all: initial;
  display: block !important;
  box-sizing: border-box !important;
  --fc-font-family: system-ui, -apple-system, sans-serif;
  --fc-font-size: 14px;
  --fc-label-color: #333;
  --fc-label-weight: 500;
  --fc-input-bg: #fff;
  --fc-input-border: #d1d5db;
  --fc-input-radius: 6px;
  --fc-input-focus-border: #4a90d9;
  --fc-input-focus-shadow: 0 0 0 3px rgba(74,144,217,0.15);
  --fc-input-error-border: #e74c3c;
  --fc-error-color: #e74c3c;
  --fc-error-size: 12px;
  --fc-primary-color: #4a90d9;
  --fc-spacing: 16px;
  --fc-disabled-opacity: 0.5;
  --fc-input-padding: 8px 12px;
  --fc-transition: 0.2s ease;
  font-family: var(--fc-font-family) !important;
  font-size: var(--fc-font-size) !important;
  color: #333 !important;
  line-height: 1.5 !important;
}

.form-creator *,
.form-creator *::before,
.form-creator *::after { box-sizing: border-box !important; }

.form-creator .fc-field { margin-bottom: var(--fc-spacing) !important; }

.form-creator .fc-field__label {
  display: block !important;
  margin-bottom: 6px !important;
  color: var(--fc-label-color) !important;
  font-weight: var(--fc-label-weight) !important;
  font-size: var(--fc-font-size) !important;
}

.form-creator .fc-field__control { position: relative !important; }

.form-creator .fc-input {
  width: 100% !important;
  padding: var(--fc-input-padding) !important;
  font-size: var(--fc-font-size) !important;
  font-family: var(--fc-font-family) !important;
  background: var(--fc-input-bg) !important;
  border: 1px solid var(--fc-input-border) !important;
  border-radius: var(--fc-input-radius) !important;
  outline: none !important;
  transition: border-color var(--fc-transition), box-shadow var(--fc-transition) !important;
  box-sizing: border-box !important;
}
.form-creator .fc-input:focus {
  border-color: var(--fc-input-focus-border) !important;
  box-shadow: var(--fc-input-focus-shadow) !important;
}
.form-creator .fc-input:disabled {
  opacity: var(--fc-disabled-opacity) !important;
  cursor: not-allowed !important;
}

.form-creator .fc-display {
  background: #f9fafb !important; min-height: 38px !important;
  display: flex !important; align-items: center !important;
  color: #333 !important; user-select: none !important;
}

.form-creator .fc-field--error .fc-input,
.form-creator .fc-field--error .fc-switch__slider,
.form-creator .fc-field--error .fc-select-wrap select {
  border-color: var(--fc-input-error-border) !important;
}

.form-creator .fc-field__error {
  display: none !important;
  margin: 4px 0 0 0 !important;
  font-size: var(--fc-error-size) !important;
  color: var(--fc-error-color) !important;
  min-height: 16px !important;
}
.form-creator .fc-field--error .fc-field__error { display: block !important; }

/* Switch */
.form-creator .fc-switch {
  position: relative !important; display: inline-flex !important; align-items: center !important; cursor: pointer !important;
}
.form-creator .fc-switch input { position: absolute !important; opacity: 0 !important; width: 0 !important; height: 0 !important; }
.form-creator .fc-switch__slider {
  display: inline-block !important; width: 44px !important; height: 24px !important;
  background: #ccc !important; border-radius: 24px !important; position: relative !important;
  transition: background var(--fc-transition) !important;
}
.form-creator .fc-switch__slider::after {
  content: '' !important; position: absolute !important; width: 18px !important; height: 18px !important;
  border-radius: 50% !important; background: #fff !important; top: 3px !important; left: 3px !important;
  transition: transform var(--fc-transition) !important;
}
.form-creator .fc-switch input:checked + .fc-switch__slider { background: var(--fc-primary-color) !important; }
.form-creator .fc-switch input:checked + .fc-switch__slider::after { transform: translateX(20px) !important; }

/* Radio & Checkbox groups */
.form-creator .fc-radio-group,
.form-creator .fc-checkbox-group { display: flex !important; flex-wrap: wrap !important; gap: 12px !important; }
.form-creator .fc-radio,
.form-creator .fc-checkbox {
  display: inline-flex !important; align-items: center !important; gap: 6px !important;
  cursor: pointer !important; font-size: var(--fc-font-size) !important;
}
.form-creator .fc-radio input[type="radio"],
.form-creator .fc-checkbox input[type="checkbox"] {
  width: 16px !important; height: 16px !important; accent-color: var(--fc-primary-color) !important; cursor: pointer !important;
}

.form-creator .fc-radio-group--column,
.form-creator .fc-checkbox-group--column {
  flex-direction: column !important;
  gap: 8px !important;
}

/* Select */
.form-creator .fc-select-wrap { position: relative !important; }
.form-creator .fc-select-wrap select {
  width: 100% !important; padding: var(--fc-input-padding) !important;
  font-size: var(--fc-font-size) !important; font-family: var(--fc-font-family) !important;
  background: var(--fc-input-bg) !important; border: 1px solid var(--fc-input-border) !important;
  border-radius: var(--fc-input-radius) !important; outline: none !important; box-sizing: border-box !important;
  appearance: none !important; cursor: pointer !important;
  color: #333 !important;
}
.form-creator .fc-select--placeholder {
  color: #999 !important;
}
.form-creator .fc-select-wrap select:focus {
  border-color: var(--fc-input-focus-border) !important;
  box-shadow: var(--fc-input-focus-shadow) !important;
}
.form-creator .fc-select-wrap::after {
  content: '' !important; position: absolute !important; right: 12px !important; top: 50% !important; transform: translateY(-50%) !important;
  width: 0 !important; height: 0 !important; border-left: 5px solid transparent !important;
  border-right: 5px solid transparent !important; border-top: 6px solid #666 !important; pointer-events: none !important;
}

/* Slider */
.form-creator .fc-slider-wrap { display: flex !important; align-items: center !important; gap: 12px !important; }
.form-creator .fc-slider-wrap input[type="range"] { flex: 1 !important; accent-color: var(--fc-primary-color) !important; }
.form-creator .fc-slider__value { min-width: 36px !important; text-align: right !important; font-size: var(--fc-font-size) !important; color: var(--fc-label-color) !important; }

/* File */
.form-creator .fc-file-wrap { display: flex !important; align-items: center !important; gap: 10px !important; }
.form-creator .fc-file-input { font-size: var(--fc-font-size) !important; }
.form-creator .fc-file-hint { font-size: var(--fc-font-size) !important; color: #999 !important; }
.form-creator .fc-file-input::-webkit-file-upload-button {
  background: var(--fc-primary-color) !important; color: #fff !important; border: none !important;
  padding: 6px 16px !important; border-radius: var(--fc-input-radius) !important; cursor: pointer !important;
  margin-right: 10px !important;
}
.form-creator .fc-file-input::file-selector-button {
  background: var(--fc-primary-color) !important; color: #fff !important; border: none !important;
  padding: 6px 16px !important; border-radius: var(--fc-input-radius) !important; cursor: pointer !important;
  margin-right: 10px !important;
}

/* Color */
.form-creator input[type="color"].fc-input {
  width: 48px !important; height: 36px !important; padding: 2px !important; cursor: pointer !important;
}

/* Layout: horizontal */
.form-creator .fc-field--horizontal { display: flex !important; align-items: flex-start !important; gap: 12px !important; }
.form-creator .fc-field--horizontal .fc-field__label { min-width: 100px !important; margin-bottom: 0 !important; padding-top: 8px !important; }
.form-creator .fc-field--horizontal .fc-field__control { flex: 1 !important; }
.form-creator .fc-field--horizontal .fc-field__error { padding-left: 112px !important; }

/* Layout: inline */
.form-creator .fc-field--inline { display: inline-flex !important; align-items: center !important; gap: 8px !important; margin-right: var(--fc-spacing) !important; margin-bottom: 8px !important; }
.form-creator .fc-field--inline .fc-field__label { margin-bottom: 0 !important; }
`;
    document.head.appendChild(style);
  }

  // ========== Schema Parser ==========
  const FIELD_DEFAULTS = Object.freeze({
    type: 'text',
    label: '',
    defaultValue: '',
    placeholder: '',
    disabled: false,
    options: [],
    rules: [],
    min: undefined,
    max: undefined,
    step: undefined,
    accept: undefined,
    multiple: false,
    rows: 4,
    maxlength: undefined,
    mode: undefined,       // 'column' for radio/checkbox vertical layout
  });

  function normalizeSchema(schema) {
    if (!Array.isArray(schema)) throw new Error('Schema must be an array');
    return schema.map((field, i) => {
      if (!field.name) throw new Error(`Field at index ${i} is missing a "name" property`);
      const merged = { ...FIELD_DEFAULTS };
      // Copy properties, skipping undefined to keep defaults
      for (const key of Object.keys(field)) {
        if (field[key] !== undefined) merged[key] = field[key];
      }
      return merged;
    });
  }

  // ========== Validation Engine ==========

  function isValueEmpty(value) {
    return value == null || value === '' ||
      (Array.isArray(value) && value.length === 0);
  }

  function safeRegex(pattern) {
    try { return new RegExp(pattern); } catch (e) { return null; }
  }

  function safeCall(fn, value) {
    try { return fn(value); } catch (e) { return false; }
  }

  // Convert custom rule to function — accepts both Function and String
  function resolveCustom(custom) {
    if (typeof custom === 'function') return custom;
    if (typeof custom === 'string') {
      try {
        if (custom.includes('=>')) {
          return new Function('return ' + custom)();
        }
        return new Function('v', 'return (' + custom + ')');
      } catch (e) { return null; }
    }
    return null;
  }

  function validateField(value, rules, validators) {
    if (!rules || rules.length === 0) return [];

    const errors = [];
    for (const rule of rules) {
      // required check
      if (rule.required) {
        if (isValueEmpty(value)) {
          errors.push(rule.message || '此项必填');
          continue;
        }
      }

      // Skip other validations if value is empty and not required
      if (isValueEmpty(value)) continue;

      // pattern
      if (rule.pattern) {
        const regex = safeRegex(rule.pattern);
        if (!regex || !regex.test(String(value))) {
          errors.push(rule.message || '格式不正确');
        }
      }

      // min
      if (rule.min !== undefined) {
        const num = Array.isArray(value) ? value.length : (typeof value === 'string' ? value.length : Number(value));
        if (num < rule.min) {
          errors.push(rule.message || `最小值 ${rule.min}`);
        }
      }

      // max
      if (rule.max !== undefined) {
        const num = Array.isArray(value) ? value.length : (typeof value === 'string' ? value.length : Number(value));
        if (num > rule.max) {
          errors.push(rule.message || `最大值 ${rule.max}`);
        }
      }

      // named validator from validators map
      if (rule.validator && validators && typeof validators[rule.validator] === 'function') {
        if (!safeCall(validators[rule.validator], value)) {
          errors.push(rule.message || '校验失败');
        }
      }

      // custom — function (JS object) or string expression (JSON-safe)
      if (rule.custom != null) {
        const fn = resolveCustom(rule.custom);
        if (fn && !safeCall(fn, value)) {
          errors.push(rule.message || '校验失败');
        }
      }
    }
    return errors;
  }

  // ========== Component Renderers ==========

  // Shared helper: build field wrapper with label, control area, and error slot
  function createFieldWrapper(field) {
    const $el = document.createElement('div');
    $el.className = `fc-field fc-field--${field.type}`;
    if (field.disabled) $el.classList.add('fc-field--disabled');

    const $label = document.createElement('label');
    $label.className = 'fc-field__label';
    $label.textContent = field.label;

    const $control = document.createElement('div');
    $control.className = 'fc-field__control';

    const $error = document.createElement('p');
    $error.className = 'fc-field__error';

    if (field.label) $el.appendChild($label);
    $el.appendChild($control);
    $el.appendChild($error);

    return { $el, $label, $control, $error };
  }

  // Shared helper: create standard <input>
  function createInput(field, type) {
    const $input = document.createElement('input');
    $input.type = type;
    $input.name = field.name;
    $input.className = 'fc-input';
    if (field.placeholder) $input.placeholder = field.placeholder;
    if (field.disabled) $input.disabled = true;
    if (field.maxlength != null) $input.maxLength = field.maxlength;
    return $input;
  }

  function renderText(field, onChange) {
    const { $el, $control, $error } = createFieldWrapper(field);
    const $input = createInput(field, 'text');
    $input.value = field.defaultValue || '';
    $control.appendChild($input);
    $input.addEventListener('input', onChange);
    $input.addEventListener('blur', onChange);
    return { $el, $input, $error, getValue: () => $input.value, setValue: (v) => { $input.value = v ?? ''; } };
  }

  function renderDisplay(field, onChange) {
    const { $el, $control, $error } = createFieldWrapper(field);
    const $display = document.createElement('div');
    $display.className = 'fc-input fc-display';
    $display.textContent = field.defaultValue || '';
    $control.appendChild($display);
    return { $el, $input: $display, $error, getValue: () => $display.textContent, setValue: (v) => { $display.textContent = v ?? ''; } };
  }

  function renderPassword(field, onChange) {
    const { $el, $control, $error } = createFieldWrapper(field);
    const $input = createInput(field, 'password');
    $input.value = field.defaultValue || '';
    $control.appendChild($input);
    $input.addEventListener('input', onChange);
    $input.addEventListener('blur', onChange);
    return { $el, $input, $error, getValue: () => $input.value, setValue: (v) => { $input.value = v ?? ''; } };
  }

  function renderNumber(field, onChange) {
    const { $el, $control, $error } = createFieldWrapper(field);
    const $input = createInput(field, 'number');
    $input.value = field.defaultValue ?? '';
    if (field.min !== undefined) $input.min = field.min;
    if (field.max !== undefined) $input.max = field.max;
    if (field.step !== undefined) $input.step = field.step;
    $control.appendChild($input);
    $input.addEventListener('input', onChange);
    $input.addEventListener('blur', onChange);
    return { $el, $input, $error, getValue: () => $input.value === '' ? '' : Number($input.value), setValue: (v) => { $input.value = v ?? ''; } };
  }

  function renderTextarea(field, onChange) {
    const { $el, $control, $error } = createFieldWrapper(field);
    const $textarea = document.createElement('textarea');
    $textarea.name = field.name;
    $textarea.className = 'fc-input';
    $textarea.rows = field.rows || 4;
    $textarea.value = field.defaultValue || '';
    if (field.placeholder) $textarea.placeholder = field.placeholder;
    if (field.disabled) $textarea.disabled = true;
    if (field.maxlength != null) $textarea.maxLength = field.maxlength;
    $control.appendChild($textarea);
    $textarea.addEventListener('input', onChange);
    $textarea.addEventListener('blur', onChange);
    return { $el, $input: $textarea, $error, getValue: () => $textarea.value, setValue: (v) => { $textarea.value = v ?? ''; } };
  }

  function renderSelect(field, onChange) {
    const { $el, $control, $error } = createFieldWrapper(field);
    const $wrap = document.createElement('div');
    $wrap.className = 'fc-select-wrap';
    const $select = document.createElement('select');
    $select.name = field.name;
    $select.className = 'fc-input';
    if (field.disabled) $select.disabled = true;
    if (field.multiple) $select.multiple = true;
    const hasDefault = field.defaultValue != null && field.defaultValue !== '';
    if (!field.multiple && !hasDefault) {
      const $ph = document.createElement('option');
      $ph.value = '';
      $ph.textContent = field.placeholder || '请选择';
      $ph.className = 'fc-select-placeholder';
      $select.appendChild($ph);
    }
    field.options.forEach(opt => {
      const $option = document.createElement('option');
      if (typeof opt === 'string') {
        $option.value = opt;
        $option.textContent = opt;
      } else {
        $option.value = opt.value;
        $option.textContent = opt.label || opt.value;
      }
      if ($option.value === String(field.defaultValue)) $option.selected = true;
      $select.appendChild($option);
    });
    if (!field.multiple && !hasDefault) {
      $select.value = '';
      $select.classList.add('fc-select--placeholder');
    }
    $wrap.appendChild($select);
    $control.appendChild($wrap);
    $select.addEventListener('change', () => {
      if (!field.multiple && !hasDefault) {
        $select.classList.toggle('fc-select--placeholder', $select.value === '');
      }
      onChange();
    });
    return {
      $el, $input: $select, $error,
      getValue: () => field.multiple
        ? Array.from($select.selectedOptions).map(o => o.value)
        : $select.value,
      setValue: (v) => {
        if (field.multiple && Array.isArray(v)) {
          Array.from($select.options).forEach(o => { o.selected = v.includes(o.value); });
        } else {
          $select.value = v ?? '';
        }
      }
    };
  }

  function renderRadio(field, onChange) {
    const { $el, $control, $error } = createFieldWrapper(field);
    const $group = document.createElement('div');
    $group.className = 'fc-radio-group';
    if (field.mode === 'column') $group.classList.add('fc-radio-group--column');
    const $radios = [];
    field.options.forEach(opt => {
      const val = typeof opt === 'string' ? opt : opt.value;
      const labelText = typeof opt === 'string' ? opt : (opt.label || opt.value);
      const $wrapper = document.createElement('label');
      $wrapper.className = 'fc-radio';
      const $radio = document.createElement('input');
      $radio.type = 'radio';
      $radio.name = field.name;
      $radio.value = val;
      if (field.disabled) $radio.disabled = true;
      if (val === String(field.defaultValue)) $radio.checked = true;
      $wrapper.appendChild($radio);
      $wrapper.appendChild(document.createTextNode(labelText));
      $group.appendChild($wrapper);
      $radios.push($radio);
      $radio.addEventListener('change', onChange);
    });
    $control.appendChild($group);
    return {
      $el, $input: $radios[0], $error,
      getValue: () => {
        const checked = $group.querySelector('input:checked');
        return checked ? checked.value : '';
      },
      setValue: (v) => {
        $radios.forEach(r => { r.checked = r.value === String(v); });
      }
    };
  }

  function renderCheckbox(field, onChange) {
    const { $el, $control, $error } = createFieldWrapper(field);
    const $group = document.createElement('div');
    $group.className = 'fc-checkbox-group';
    if (field.mode === 'column') $group.classList.add('fc-checkbox-group--column');
    const defVals = Array.isArray(field.defaultValue) ? field.defaultValue : [];
    const $checkboxes = [];
    field.options.forEach(opt => {
      const val = typeof opt === 'string' ? opt : opt.value;
      const labelText = typeof opt === 'string' ? opt : (opt.label || opt.value);
      const $wrapper = document.createElement('label');
      $wrapper.className = 'fc-checkbox';
      const $cb = document.createElement('input');
      $cb.type = 'checkbox';
      $cb.value = val;
      if (field.disabled) $cb.disabled = true;
      if (defVals.includes(val)) $cb.checked = true;
      $wrapper.appendChild($cb);
      $wrapper.appendChild(document.createTextNode(labelText));
      $group.appendChild($wrapper);
      $checkboxes.push($cb);
      $cb.addEventListener('change', onChange);
    });
    $control.appendChild($group);
    return {
      $el, $input: $checkboxes[0], $error,
      getValue: () => $checkboxes.filter(cb => cb.checked).map(cb => cb.value),
      setValue: (v) => {
        const vals = Array.isArray(v) ? v : [];
        $checkboxes.forEach(cb => { cb.checked = vals.includes(cb.value); });
      }
    };
  }

  function renderDate(field, onChange) {
    const { $el, $control, $error } = createFieldWrapper(field);
    const $input = createInput(field, 'date');
    $input.value = field.defaultValue || '';
    $control.appendChild($input);
    $input.addEventListener('change', onChange);
    $input.addEventListener('blur', onChange);
    return { $el, $input, $error, getValue: () => $input.value, setValue: (v) => { $input.value = v ?? ''; } };
  }

  function renderTime(field, onChange) {
    const { $el, $control, $error } = createFieldWrapper(field);
    const $input = createInput(field, 'time');
    $input.value = field.defaultValue || '';
    $control.appendChild($input);
    $input.addEventListener('change', onChange);
    $input.addEventListener('blur', onChange);
    return { $el, $input, $error, getValue: () => $input.value, setValue: (v) => { $input.value = v ?? ''; } };
  }

  function renderColor(field, onChange) {
    const { $el, $control, $error } = createFieldWrapper(field);
    const $input = createInput(field, 'color');
    $input.value = field.defaultValue || '#000000';
    $input.classList.add('fc-input--color');
    $control.appendChild($input);
    $input.addEventListener('input', onChange);
    $input.addEventListener('change', onChange);
    return { $el, $input, $error, getValue: () => $input.value, setValue: (v) => { $input.value = v ?? '#000000'; } };
  }

  function renderFile(field, onChange) {
    const { $el, $control, $error } = createFieldWrapper(field);
    const $wrap = document.createElement('div');
    $wrap.className = 'fc-file-wrap';
    const $input = document.createElement('input');
    $input.type = 'file';
    $input.name = field.name;
    $input.className = 'fc-file-input';
    if (field.accept) $input.accept = field.accept;
    if (field.multiple) $input.multiple = true;
    if (field.disabled) $input.disabled = true;
    const $hint = document.createElement('span');
    $hint.className = 'fc-file-hint';
    $hint.textContent = field.placeholder || '点击选择文件';
    $wrap.appendChild($input);
    $wrap.appendChild($hint);
    $control.appendChild($wrap);
    $input.addEventListener('change', () => {
      if ($input.files && $input.files.length) {
        $hint.textContent = field.multiple
          ? `已选 ${$input.files.length} 个文件`
          : $input.files[0].name;
      } else {
        $hint.textContent = field.placeholder || '点击选择文件';
      }
      onChange();
    });
    return {
      $el, $input, $error,
      getValue: () => field.multiple ? Array.from($input.files) : ($input.files[0] || null),
      setValue: () => { /* file inputs cannot be set programmatically */ }
    };
  }

  function renderSlider(field, onChange) {
    const { $el, $control, $error } = createFieldWrapper(field);
    const $wrap = document.createElement('div');
    $wrap.className = 'fc-slider-wrap';
    const $input = document.createElement('input');
    $input.type = 'range';
    $input.name = field.name;
    $input.className = 'fc-slider';
    $input.min = field.min ?? 0;
    $input.max = field.max ?? 100;
    $input.step = field.step ?? 1;
    $input.value = field.defaultValue ?? field.min ?? 0;
    if (field.disabled) $input.disabled = true;
    const $display = document.createElement('span');
    $display.className = 'fc-slider__value';
    $display.textContent = $input.value;
    $wrap.appendChild($input);
    $wrap.appendChild($display);
    $control.appendChild($wrap);
    $input.addEventListener('input', () => {
      $display.textContent = $input.value;
      onChange();
    });
    return {
      $el, $input, $error,
      getValue: () => Number($input.value),
      setValue: (v) => { $input.value = v ?? field.min ?? 0; $display.textContent = $input.value; }
    };
  }

  function renderSwitch(field, onChange) {
    const { $el, $control, $error } = createFieldWrapper(field);
    const $switch = document.createElement('label');
    $switch.className = 'fc-switch';
    const $input = document.createElement('input');
    $input.type = 'checkbox';
    $input.name = field.name;
    $input.checked = !!field.defaultValue;
    if (field.disabled) $input.disabled = true;
    const $slider = document.createElement('span');
    $slider.className = 'fc-switch__slider';
    $switch.appendChild($input);
    $switch.appendChild($slider);
    $control.appendChild($switch);
    $input.addEventListener('change', onChange);
    return {
      $el, $input, $error,
      getValue: () => $input.checked,
      setValue: (v) => { $input.checked = !!v; }
    };
  }

  // ========== Component Registry ==========
  const COMPONENT_MAP = Object.freeze({
    text: renderText,
    display: renderDisplay,
    password: renderPassword,
    number: renderNumber,
    textarea: renderTextarea,
    select: renderSelect,
    radio: renderRadio,
    checkbox: renderCheckbox,
    switch: renderSwitch,
    date: renderDate,
    time: renderTime,
    color: renderColor,
    slider: renderSlider,
    file: renderFile,
  });

  function renderField(field, onChange, validators) {
    const renderer = COMPONENT_MAP[field.type];
    if (!renderer) throw new Error(`Unknown field type: "${field.type}"`);
    return renderer(field, onChange, validators);
  }

  // ========== FormField Class ==========
  class FormField {
    constructor(fieldConfig, onChange, validators, validateOnBlur, onFieldClick) {
      this.config = fieldConfig;
      this._onChange = onChange;
      this._validators = validators;
      this._validateOnBlur = validateOnBlur !== false;

      const component = renderField(fieldConfig, () => this._handleChange(), validators);
      this.$el = component.$el;
      this._$error = component.$error;
      this._$input = component.$input;
      this._component = component;
      this._touched = false;
      this._errors = [];

      // Attach field click handler
      if (onFieldClick) {
        this.$el.addEventListener('click', (e) => {
          // Don't fire when clicking actual interactive controls
          if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'LABEL') return;
          onFieldClick({ name: fieldConfig.name, field: this, setValue: (v) => this.setValue(v) });
        });
      }
    }

    getValue() {
      return this._component.getValue();
    }

    setValue(val) {
      this._component.setValue(val);
      if (this._touched) this.validate();
    }

    validate() {
      this._touched = true;
      this._errors = validateField(this.getValue(), this.config.rules, this._validators);
      if (this._errors.length > 0) {
        this.$el.classList.add('fc-field--error');
        if (this._$error) this._$error.textContent = this._errors[0];
      } else {
        this.$el.classList.remove('fc-field--error');
        if (this._$error) this._$error.textContent = '';
      }
      return this._errors;
    }

    _handleChange() {
      if (this._validateOnBlur) {
        this._touched = true;
        this.validate();
      }
      this._onChange();
    }
  }


  // ========== FormCreator Class ==========
  class FormCreator {
    constructor(options = {}) {
      this._options = options;
      this._validators = options.validators || {};
      this._layout = options.layout || 'vertical';
      this._validateOnBlur = options.validateOnBlur !== false;
      this._onFieldClick = options.onFieldClick || null;
      this._listeners = [];

      // Resolve container
      const container = options.container;
      if (typeof container === 'string') {
        this._$container = document.querySelector(container);
        if (!this._$container) throw new Error(`Container not found: "${container}"`);
      } else if (container instanceof HTMLElement) {
        this._$container = container;
      } else {
        throw new Error('Container must be a CSS selector string or DOM element');
      }
      this._$container.classList.add('form-creator');

      // Inject styles once
      injectStyles();

      // Parse and render
      this._schema = normalizeSchema(options.schema || []);
      this._fields = new Map();
      this._render();
    }

    _render() {
      this._$container.innerHTML = '';
      this._fields.clear();

      this._schema.forEach(fieldConfig => {
        const field = new FormField(
          fieldConfig,
          () => this._notify(fieldConfig.name),
          this._validators,
          this._validateOnBlur,
          this._onFieldClick
        );

        // Apply layout class
        if (this._layout && this._layout !== 'vertical') {
          field.$el.classList.add(`fc-field--${this._layout}`);
        }

        this._$container.appendChild(field.$el);
        this._fields.set(fieldConfig.name, field);
      });
    }

    getField(name) {
      return this._fields.get(name) || null;
    }

    _notify(name) {
      const values = this.getValues();
      this._listeners.forEach(fn => {
        try { fn(values, name); } catch (e) { /* silent */ }
      });
    }

    getValues() {
      const values = {};
      this._fields.forEach((field, name) => {
        values[name] = field.getValue();
      });
      return values;
    }

    setValues(data) {
      if (!data) return;
      Object.keys(data).forEach(name => {
        const field = this._fields.get(name);
        if (field) field.setValue(data[name]);
      });
    }

    validate() {
      let valid = true;
      const errors = {};
      this._fields.forEach((field, name) => {
        const fieldErrors = field.validate();
        if (fieldErrors.length > 0) {
          valid = false;
          errors[name] = fieldErrors;
        }
      });
      return { valid, errors };
    }

    reset() {
      this._fields.forEach((field, name) => {
        const config = this._schema.find(f => f.name === name);
        if (config) field.setValue(config.defaultValue);
      });
    }

    onChange(fn) {
      if (typeof fn !== 'function') return;
      this._listeners.push(fn);
      return () => {
        const idx = this._listeners.indexOf(fn);
        if (idx !== -1) this._listeners.splice(idx, 1);
      };
    }

    destroy() {
      this._listeners = [];
      this._fields.forEach(field => {
        field.$el.remove();
      });
      this._fields.clear();
      this._$container.innerHTML = '';
      this._$container.classList.remove('form-creator');
    }
  }

  // ========== Export ==========
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormCreator;
  } else {
    window.FormCreator = FormCreator;
  }

})();
