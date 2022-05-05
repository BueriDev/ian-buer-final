#include <jni.h>
#include <libmbCHIP8/libmbchip8.h>
#include <iostream>
using namespace chip8;
using namespace std;

namespace
{
    static void throwException(JNIEnv *env, const char *msg, const char *exception_name = "java/lang/Exception")
    {
        auto exception_class = env->FindClass(exception_name);
        env->ThrowNew(exception_class, msg);
    }

    class mbCHIP8JNI : public mbCHIP8Frontend
    {
    public:
        mbCHIP8JNI() : env_(NULL)
        {
            core.setFrontend(this);
        }

        ~mbCHIP8JNI()
        {

        }

        Chip8Core &getCore()
        {
            return core;
        }

        void setJniEnv(JNIEnv *env)
        {
            if (env == NULL)
            {
                throw runtime_error("Invalid JNI environment state");
            }

            this->env_ = env;
        }

    private:
        JNIEnv *env_;
        Chip8Core core;
    };
}

extern "C"
{
    jlong Java_io_github_mbchip8_mbCHIP8_createInstance(JNIEnv *env, jclass c)
    {
        return (jlong)new mbCHIP8JNI();
    }

    void Java_io_github_mbchip8_mbCHIP8_release(JNIEnv *env, jclass c, jlong handle)
    {
        delete (mbCHIP8JNI*)handle;
    }

    jboolean Java_io_github_mbchip8_mbCHIP8_init(JNIEnv *env, jclass c, jlong handle)
    {
        auto core = (mbCHIP8JNI*)handle;

        bool res = core->getCore().init();
        return (jboolean)res;
    }

    jboolean Java_io_github_mbchip8_mbCHIP8_loadROM(JNIEnv *env, jclass c, jlong handle, jbyteArray byte_buffer)
    {
        auto core = (mbCHIP8JNI*)handle;
        uint8_t* byte_ptr = (uint8_t*)env->GetByteArrayElements(byte_buffer, 0);
        size_t length = (size_t)env->GetArrayLength(byte_buffer);

        vector<uint8_t> rom_data(&byte_ptr[0], &byte_ptr[length]);
        return (jboolean)core->getCore().loadROM(rom_data);
    }

    void Java_io_github_mbchip8_mbCHIP8_shutdown(JNIEnv *env, jclass c, jlong handle)
    {
        auto core = (mbCHIP8JNI*)handle;
        core->getCore().shutdown();
    }

    void Java_io_github_mbchip8_mbCHIP8_runCore(JNIEnv *env, jclass c, jlong handle)
    {
        auto core = (mbCHIP8JNI*)handle;
        core->getCore().runCore();
    }

    jboolean Java_io_github_mbchip8_mbCHIP8_getPixel(JNIEnv *env, jclass c, jlong handle, jint xpos, jint ypos)
    {
        auto core = (mbCHIP8JNI*)handle;

        int xcoord = (int)xpos;
        int ycoord = (int)ypos;

        bool pixel_val = core->getCore().getPixel(xcoord, ycoord);
        return (jboolean)pixel_val;
    }

    void Java_io_github_mbchip8_mbCHIP8_keyChanged(JNIEnv *env, jclass c, jlong handle, jint key, jboolean is_pressed)
    {
        auto core = (mbCHIP8JNI*)handle;
        int key_val = (int)key;
        bool is_pressed_key = (bool)is_pressed;
        core->getCore().keyChanged(key_val, is_pressed_key);
    }

    void Java_io_github_mbchip8_mbCHIP8_setJNIEnv(JNIEnv *env, jclass c, jlong handle)
    {
        auto core = (mbCHIP8JNI*)handle;
        core->setJniEnv(env);
    }
}