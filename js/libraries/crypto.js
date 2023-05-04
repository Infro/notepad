(() => {
  const cl = 1024;
  let ciphertext, iv,
    _key = JSON.parse(localStorage.getItem('aes-gcm-key')),
    enc=new TextEncoder(),
    dec = new TextDecoder();
  if(_key === null) {
    window.crypto.subtle.generateKey({name: "AES-GCM",length: cl,},
      true,
      ["encrypt", "decrypt"]
    ).then((key) => {
      _key=key;
      localStorage.setItem('aes-gcm-key', JSON.stringify(key));
    });
  }
  async function encryptMessage(message) {
    iv = window.crypto.getRandomValues(new Uint8Array(12));
    ciphertext = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      _key,
      enc.encode(message)
    );
    return {ciphertext, iv};
  }
  async function decryptMessage(data) {
    let decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: data.iv },
      _key,
      data.ciphertext
    );
    return dec.decode(decrypted);
  }
})();