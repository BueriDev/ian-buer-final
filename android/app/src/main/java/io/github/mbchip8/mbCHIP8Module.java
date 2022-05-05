package io.github.mbchip8;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import io.github.mbchip8.mbCHIP8;

import expo.modules.core.errors.InvalidArgumentException;

public class mbCHIP8Module extends ReactContextBaseJavaModule {
    static {
        System.loadLibrary("mbCHIP8-jni");
    }
    public mbCHIP8Module(ReactApplicationContext reactContext)
    {
        super(reactContext);
        core = new mbCHIP8();
    }

    public void release()
    {
        core.release();
    }

    public String getName() {
        return "mbCHIP8";
    }

    @ReactMethod
    public void init(Promise promise)
    {
        boolean init_res = core.initCore();
        promise.resolve(init_res);
    }

    @ReactMethod
    public void loadROM(ReadableArray rom_arr, Promise promise)
    {
        try
        {
            boolean value = core.loadROM(readabletoByte(rom_arr));
            promise.resolve(value);
        } catch (Exception e)
        {
            promise.reject(e.getLocalizedMessage(), e.getMessage());
        }
    }

    @ReactMethod
    public void shutdown()
    {
        core.shutdown();
    }

    @ReactMethod
    public void run()
    {
        core.run();
    }

    @ReactMethod
    public void getPixel(int xpos, int ypos, Promise promise)
    {
        try
        {
            if ((xpos < 0) || (xpos >= 64) || (ypos < 0) || (ypos >= 32))
            {
                throw new InvalidArgumentException("Out-of-bounds");
            }

            boolean value = core.getPixel(xpos, ypos);
            promise.resolve(value);
        }
        catch (Exception ex)
        {
            promise.reject(ex.getLocalizedMessage(), ex.getMessage());
        }
    }

    @ReactMethod
    public void keyChanged(int key, boolean is_pressed)
    {
        core.keyChanged(key, is_pressed);
    }

    private void log_info(String msg)
    {
        Log.i("ReactNative", msg);
    }



    private byte[] readabletoByte(ReadableArray array)
    {
        byte[] bytesarr = new byte[array.size()];

        for (int i = 0; i < array.size(); i++)
        {
            int entry = array.getInt(i);
            bytesarr[i] = (byte)entry;
        }

        return bytesarr;
    }

    private mbCHIP8 core;
}
