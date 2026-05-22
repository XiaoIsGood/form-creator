(function () {
  'use strict';

  // ========== CSS Injection ==========
  function injectStyles() {
    if (document.getElementById('fc-styles')) return;

    const style = document.createElement('style');
    style.id = 'fc-styles';
    style.textContent = `
.form-creator {
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
  font-family: var(--fc-font-family);
  font-size: var(--fc-font-size);
}

.fc-field { margin-bottom: var(--fc-spacing); }

.fc-field__label {
  display: block;
  margin-bottom: 6px;
  color: var(--fc-label-color);
  font-weight: var(--fc-label-weight);
  font-size: var(--fc-font-size);
}

.fc-field__control { position: relative; }

.fc-input {
  width: 100%;
  padding: var(--fc-input-padding);
  font-size: var(--fc-font-size);
  font-family: var(--fc-font-family);
  background: var(--fc-input-bg);
  border: 1px solid var(--fc-input-border);
  border-radius: var(--fc-input-radius);
  outline: none;
  transition: border-color var(--fc-transition), box-shadow var(--fc-transition);
  box-sizing: border-box;
}
.fc-input:focus {
  border-color: var(--fc-input-focus-border);
  box-shadow: var(--fc-input-focus-shadow);
}
.fc-input:disabled {
  opacity: var(--fc-disabled-opacity);
  cursor: not-allowed;
}
.fc-field--error .fc-input,
.fc-field--error .fc-switch__slider,
.fc-field--error .fc-select-wrap select,
textarea.fc-input.fc-error { border-color: var(--fc-input-error-border); }

.fc-field__error {
  display: none;
  margin: 4px 0 0 0;
  font-size: var(--fc-error-size);
  color: var(--fc-error-color);
  min-height: 16px;
}
.fc-field--error .fc-field__error { display: block; }

/* Switch */
.fc-switch {
  position: relative; display: inline-flex; align-items: center; cursor: pointer;
}
.fc-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.fc-switch__slider {
  display: inline-block; width: 44px; height: 24px;
  background: #ccc; border-radius: 24px; position: relative;
  transition: background var(--fc-transition);
}
.fc-switch__slider::after {
  content: ''; position: absolute; width: 18px; height: 18px;
  border-radius: 50%; background: #fff; top: 3px; left: 3px;
  transition: transform var(--fc-transition);
}
.fc-switch input:checked + .fc-switch__slider { background: var(--fc-primary-color); }
.fc-switch input:checked + .fc-switch__slider::after { transform: translateX(20px); }

/* Radio & Checkbox groups */
.fc-radio-group, .fc-checkbox-group { display: flex; flex-wrap: wrap; gap: 12px; }
.fc-radio, .fc-checkbox {
  display: inline-flex; align-items: center; gap: 6px;
  cursor: pointer; font-size: var(--fc-font-size);
}
.fc-radio input[type="radio"], .fc-checkbox input[type="checkbox"] {
  width: 16px; height: 16px; accent-color: var(--fc-primary-color); cursor: pointer;
}

/* Select */
.fc-select-wrap { position: relative; }
.fc-select-wrap select {
  width: 100%; padding: var(--fc-input-padding);
  font-size: var(--fc-font-size); font-family: var(--fc-font-family);
  background: var(--fc-input-bg); border: 1px solid var(--fc-input-border);
  border-radius: var(--fc-input-radius); outline: none; box-sizing: border-box;
  appearance: none; cursor: pointer;
}
.fc-select-wrap select:focus {
  border-color: var(--fc-input-focus-border);
  box-shadow: var(--fc-input-focus-shadow);
}
.fc-select-wrap::after {
  content: ''; position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  width: 0; height: 0; border-left: 5px solid transparent;
  border-right: 5px solid transparent; border-top: 6px solid #666; pointer-events: none;
}

/* Slider */
.fc-slider-wrap { display: flex; align-items: center; gap: 12px; }
.fc-slider-wrap input[type="range"] { flex: 1; accent-color: var(--fc-primary-color); }
.fc-slider__value { min-width: 36px; text-align: right; font-size: var(--fc-font-size); color: var(--fc-label-color); }

/* File */
.fc-file-input { font-size: var(--fc-font-size); }
.fc-file-input::-webkit-file-upload-button {
  background: var(--fc-primary-color); color: #fff; border: none;
  padding: 6px 16px; border-radius: var(--fc-input-radius); cursor: pointer;
  margin-right: 10px;
}

/* Color */
input[type="color"].fc-input {
  width: 48px; height: 36px; padding: 2px; cursor: pointer;
}

/* Layout: horizontal */
.fc-field--horizontal { display: flex; align-items: flex-start; gap: 12px; }
.fc-field--horizontal .fc-field__label { min-width: 100px; margin-bottom: 0; padding-top: 8px; }
.fc-field--horizontal .fc-field__control { flex: 1; }
.fc-field--horizontal .fc-field__error { padding-left: 112px; }

/* Layout: inline */
.fc-field--inline { display: inline-flex; align-items: center; gap: 8px; margin-right: var(--fc-spacing); margin-bottom: 8px; }
.fc-field--inline .fc-field__label { margin-bottom: 0; }
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
  function validateField(value, rules, validators) {
    if (!rules || rules.length === 0) return [];

    const errors = [];
    for (const rule of rules) {
      // required check
      if (rule.required) {
        const empty = value == null || value === '' ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === 'boolean' && value === false);
        if (empty) {
          errors.push(rule.message || '此项必填');
          continue;
        }
      }

      // Skip other validations if value is empty and not required
      const isEmpty = value == null || value === '' || (Array.isArray(value) && value.length === 0);
      if (isEmpty) continue;

      // pattern
      if (rule.pattern) {
        const regex = new RegExp(rule.pattern);
        if (!regex.test(String(value))) {
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
        if (!validators[rule.validator](value)) {
          errors.push(rule.message || '校验失败');
        }
      }

      // custom function (JS object only, not JSON-safe)
      if (rule.custom && typeof rule.custom === 'function') {
        if (!rule.custom(value)) {
          errors.push(rule.message || '校验失败');
        }
      }
    }
    return errors;
  }

})();
