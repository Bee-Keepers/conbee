package com.keepers.conbee.myPage.model.service;

import com.keepers.conbee.admin.store.model.dto.Store;

public interface MyPageService {

	int myPageStoreUpdate(int storeNo, String storeTel);

	Store myPageStore(int storeNo);
}
