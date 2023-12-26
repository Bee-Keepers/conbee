package com.keepers.conbee.stock.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keepers.conbee.stock.model.dto.Stock;
import com.keepers.conbee.stock.model.mapper.StockManageMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class StockManageServiceImpl implements StockManageService{

	private final StockManageMapper mapper;

	// 상품 등록
	@Override
	public int goodsInsert(Stock stock) {
		return mapper.goodsInsert(stock);
	}

	// 상품등록 전체 조회
	@Override
	public List<Stock> goodsList(int cp) {

		// 페이지 네이션
		RowBounds rowBounds = new RowBounds((cp-1)*20, 20);
		return mapper.goodsList(rowBounds);
	}

	// 등록된 상품 삭제
	@Override
	public int goodsDelete(List<Integer> goodsNo) {

		int result = 1;

		for(int i=0; i<goodsNo.size(); i++) {
			result = mapper.goodsDelete((int)(goodsNo.get(i)));
			if(result <= 0) {
				return 0;
			}
		}
		return result;
	}

	// 등록된 상품 수정
	@Override
	public int goodsUpdate(Stock stock) {
		return mapper.goodsUpdate(stock);
	}
	
	// 재고 조회
	@Override
	public List<Stock> stockList(Stock stock, int cp) {
		RowBounds rowBounds = new RowBounds((cp-1)*20, 20);
		List<Stock> stockList = mapper.stockList(stock, rowBounds);
		
		for(Stock s : stockList ) {
			double sum = s.getStockOutPrice() * (1- ((double)s.getStockDiscount() * 0.01));
			
			s.setPriceSum( (int)sum + "" );
		}
		return stockList;
	}
	
    // 재고 수정
    @Override
    public int stockUpdateManage(List<Integer> goodsNoList, List<Integer> stockOutPriceList, List<Integer> stockDiscountList) {
        int result = 0;
        for(int i=0; i<goodsNoList.size(); i++) {
            Stock stock = new Stock();
            stock.setGoodsNo(goodsNoList.get(i));
            stock.setStockOutPrice(stockOutPriceList.get(i));
            stock.setStockDiscount(stockDiscountList.get(i));
            result = mapper.stockUpdateManage(stock);
            if(result <= 0) {
                return 0;
            }
        }
        return result;
    }

	// 재고 등록
	@Override
	public int stockInsert(Stock stock) {
		return mapper.stockInsert(stock);
	}
	
	// 재고 등록 이름 검색 시 물품 조회
	@Override
	public List<Stock> goodsNameSelect(String intputGoods, int storeValue) {
			
		Map<String, Object> map = new HashMap<>();
		map.put("intputGoods", intputGoods);
		map.put("storeValue", storeValue);
			
		return mapper.goodsNameSelect(map);
			
	}
	
	// 가게이름
	@Override
	public String storeName(int storeNo) {
		return mapper.storeName(storeNo);
	}
	
	// 상품 검색
	@Override
	public List<Stock> goodsSearch(Stock stock, int cp) {
		RowBounds rowBounds = new RowBounds((cp-1)*20, 20);
		if(stock.getLcategoryName() == null && stock.getScategoryName() == null && stock.getGoodsName() == null) {
			stock.setLcategoryName("");
			stock.setScategoryName("");
			stock.setGoodsName("");
		}
		return mapper.goodsSearch(stock, rowBounds);
	}
	
	// 입고가 수정
	@Override
	public int stockInPriceUpdate(Stock stock) {
		return mapper.stockInPriceUpdate(stock);
	}
	
	// 본사 재고 검색
	@Override
	public List<Stock> stockListSearch(Stock stock, int cp) {
		RowBounds rowBounds = new RowBounds((cp-1)*20, 20);
		if(stock.getLcategoryName() == null && stock.getScategoryName() == null && stock.getGoodsName() == null) {
			stock.setLcategoryName("");
			stock.setScategoryName("");
			stock.setGoodsName("");
		}
		List<Stock> stockList = mapper.stockListSearch(stock, rowBounds);
		for(Stock s : stockList ) {
			double sum = s.getStockOutPrice() * (1- ((double)s.getStockDiscount() * 0.01));
			
			s.setPriceSum( (int)sum + "" );
		}
		return stockList;
	}
	
	// 상품 중복 등록 검색
	@Override
	public String checkGoogsInsert(String goodsName) {
		return mapper.checkGoogsInsert(goodsName);
	}
	
}
