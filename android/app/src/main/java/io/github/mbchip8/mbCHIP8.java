package io.github.mbchip8;

public class mbCHIP8 {
    private long handle;
    public mbCHIP8()
    {
        this.handle = createInstance();
        setJNIEnv(this.handle);
    }

    public void release()
    {
        release(this.handle);
    }

    public boolean initCore()
    {
        return init(this.handle);
    }

    public void shutdown()
    {
        shutdown(this.handle);
    }

    public void run()
    {
        runCore(this.handle);
    }

    public boolean loadROM(byte[] buffer)
    {
        return loadROM(this.handle, buffer);
    }

    public void keyChanged(int key, boolean is_pressed)
    {
        keyChanged(this.handle, key, is_pressed);
    }

    public boolean getPixel(int xpos, int ypos)
    {
        return getPixel(this.handle, xpos, ypos);
    }

    public void keyPressed(int key)
    {
        keyChanged(key, true);
    }

    public void keyReleased(int key)
    {
        keyChanged(key, false);
    }

    private native long createInstance();
    private native void release(long handle);
    private native boolean init(long handle);
    private native void shutdown(long handle);
    private native boolean loadROM(long handle, byte[] buffer);
    private native void runCore(long handle);
    private native boolean getPixel(long handle, int xpos, int ypos);
    private native void keyChanged(long handle, int key, boolean is_pressed);
    private native void setJNIEnv(long handle);
}
