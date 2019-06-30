package com.fitmate_test;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.reactnative.camera.RNCameraPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnfs.RNFSPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {


  @Override
	public boolean isDebug() {
		// Make sure you are using BuildConfig from your own application
		return BuildConfig.DEBUG;
	}

	protected List<ReactPackage> getPackages() {
		// Add additional packages you require here
		// No need to add RnnPackage and MainReactPackage
<<<<<<< HEAD

    return Arrays.<ReactPackage>asList(
     new AsyncStoragePackage(),
      new VectorIconsPackage(),
			new RNFetchBlobPackage(),
       new RNCameraPackage(),
			new RNFSPackage()
=======
		return Arrays.<ReactPackage>asList(
     new AsyncStoragePackage(),
      new RNCameraPackage(),
      new VectorIconsPackage()
>>>>>>> be8fcd6affb1a39ca7aaa9ab5d8b88f54b93b453
			// eg. new VectorIconsPackage()
		);
	}

	@Override
	public List<ReactPackage> createAdditionalReactPackages() {
		return getPackages();
	}

  @Override
  public String getJSMainModuleName() {
  	return "index";
  }
}
