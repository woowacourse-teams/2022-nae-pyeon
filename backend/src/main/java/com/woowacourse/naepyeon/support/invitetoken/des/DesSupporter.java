package com.woowacourse.naepyeon.support.invitetoken.des;

import com.woowacourse.naepyeon.exception.InviteTokenInvalidFormException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DesSupporter {

    private static final String ALG = "DES/ECB/PKCS5Padding";
    private final String key;

    public DesSupporter(@Value("${security.des.key}") final String key) {
        this.key = key;
    }

    public String encrypt(final String text) {
        final Cipher cipher = getEncryptCipher();

        try {
            final byte[] encrypted = cipher.doFinal(text.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(encrypted);
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
        try {
            cipher.init(Cipher.ENCRYPT_MODE, getKey());
        } catch (final InvalidKeyException | NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new IllegalArgumentException(e);
        }
    }

    public String decrypt(final String text) {
        final Cipher cipher = getDecryptCipher();

        byte[] decodedBytes = Base64.getDecoder().decode(text);

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

    private Key getKey() throws NoSuchAlgorithmException, InvalidKeyException, InvalidKeySpecException {
        final DESKeySpec desKeySpec = new DESKeySpec(key.getBytes());
        final SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
        return keyFactory.generateSecret(desKeySpec);
    }

    private void initCipherDecryptMode(final Cipher cipher) {
        try {
            cipher.init(Cipher.DECRYPT_MODE, getKey());
        } catch (final InvalidKeyException | NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new IllegalArgumentException(e);
        }
    }
}
