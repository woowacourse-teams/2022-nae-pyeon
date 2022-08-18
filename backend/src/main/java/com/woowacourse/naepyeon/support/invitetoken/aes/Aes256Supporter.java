package com.woowacourse.naepyeon.support.invitetoken.aes;

import com.woowacourse.naepyeon.exception.InviteTokenInvalidFormException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Aes256Supporter {

    private static final String ALG = "AES/CBC/PKCS5Padding";
    private final String key;
    private final String iv;

    public Aes256Supporter(@Value("${security.aes256.key}") final String key) {
        this.key = key;
        this.iv = key.substring(0, 16);
    }

    public String encrypt(final String text) {
        final Cipher cipher = getEncryptCipher();

        try {
            final byte[] encrypted = cipher.doFinal(text.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().encodeToString(encrypted);
        } catch (final IllegalBlockSizeException | BadPaddingException e) {
            throw new RuntimeException(e);
        }
    }

    private Cipher getEncryptCipher() {
        try {
            final Cipher cipher = Cipher.getInstance(ALG);
            initCipherEncryptMode(cipher);
            return cipher;
        } catch (final NoSuchAlgorithmException | NoSuchPaddingException e) {
            throw new IllegalArgumentException(e);
        }
    }

    private void initCipherEncryptMode(final Cipher cipher) {
        final SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
        final IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
        try {
            cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivParamSpec);
        } catch (final InvalidKeyException | InvalidAlgorithmParameterException e) {
            throw new IllegalArgumentException(e);
        }
    }

    public String decrypt(final String cipherText) {
        if (cipherText == null) {
            throw new InviteTokenInvalidFormException();
        }

        final Cipher cipher = getDecryptCipher();
        byte[] decodedBytes = Base64.getUrlDecoder().decode(cipherText);

        try {
            final byte[] decrypted = cipher.doFinal(decodedBytes);
            return new String(decrypted, StandardCharsets.UTF_8);
        } catch (final IllegalBlockSizeException | BadPaddingException e) {
            throw new InviteTokenInvalidFormException();
        }
    }

    private Cipher getDecryptCipher() {
        try {
            final Cipher cipher = Cipher.getInstance(ALG);
            initCipherDecryptMode(cipher);
            return cipher;
        } catch (final NoSuchAlgorithmException | NoSuchPaddingException e) {
            throw new IllegalArgumentException(e);
        }
    }

    private void initCipherDecryptMode(final Cipher cipher) {
        final SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
        final IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
        try {
            cipher.init(Cipher.DECRYPT_MODE, keySpec, ivParamSpec);
        } catch (final InvalidKeyException | InvalidAlgorithmParameterException e) {
            throw new IllegalArgumentException(e);
        }
    }
}
