ionic cordova build android --prod --release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk saffiDihnakSign1

/opt/android-sdk/build-tools/26.0.0/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk saffiDhihnak.apk



IvThocVirfidVi7
