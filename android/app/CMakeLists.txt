cmake_minimum_required(VERSION 3.4.1)

project(mbCHIP8-jni)

file(GLOB_RECURSE MBCHIP8_SOURCES "src/main/cpp/libmbCHIP8/src/core/*.cpp")

include_directories(
    src/main/cpp/libmbCHIP8/include
    src/main/cpp/libmbCHIP8/include/libmbCHIP8
)

add_library(mbCHIP8-jni SHARED
    src/main/cpp/mbCHIP8-jni.cpp
    ${MBCHIP8_SOURCES})

find_library(log-lib log)
target_link_libraries(mbCHIP8-jni ${log-lib})