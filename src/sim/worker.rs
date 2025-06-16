use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

static mut COUNTER: u32 = 0;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = self)]
    fn postMessage(data: &JsValue);
}

#[wasm_bindgen]
pub fn tick() {
    unsafe {
        COUNTER += 1;
        let id = 0u32;
        let x = COUNTER as f64 * 0.1;
        let y = 0f64;
        let obj = js_sys::Object::new();
        js_sys::Reflect::set(&obj, &JsValue::from_str("id"), &JsValue::from_f64(id as f64)).unwrap();
        js_sys::Reflect::set(&obj, &JsValue::from_str("x"), &JsValue::from_f64(x)).unwrap();
        js_sys::Reflect::set(&obj, &JsValue::from_str("y"), &JsValue::from_f64(y)).unwrap();
        postMessage(&obj);
    }
}
