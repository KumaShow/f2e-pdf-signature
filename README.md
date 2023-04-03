# thef2e-2022-pdfsign

線上 PDF 簽名服務

![](https://i.imgur.com/2axZdz0.png)

> Demo：https://kumashow.github.io/f2e-pdf-signature/
> 
> UI designer： [小菜](https://noarzxcvbnm.github.io/PersonalWebsite/)

## 專案說明

透過 Canvas 製作 PDF 線上簽名服務的網站。

## User Story

1. 使用者可以新增自己的簽名列表，並自動儲存
2. 使用者可以透過點擊簽名，把簽名放到文件中
3. 使用者可以調整簽名擋的大小及位置
4. 使用者可以看到進度條，得知目前的簽署進度
5. 使用者可以預覽最後簽名完的結果
6. 使用者可以下載完成簽名的結果


## 使用技術

  * Vue 3 + Vite
  * Vue Router
  * Pinia
  * Tailwind CSS
  * ESLint Airbnb
  * PDF.js
  * fabric.js
  * jspdf.js

## 功能

  * 判斷上傳檔案格式是否為 PDF、檔案限制大小
  * 加入簽名
  * 下載完成後 PDF

## 其他待完成功能

  * 搜尋已上傳檔案
  * 進度條樣式更新
  * 登入樣式
  * 刪除簽名提示
  * 簽名縮放大小
  
## 參考資料

 * [The F2E 前端 & UI 修煉精神時光屋](https://2022.thef2e.com)
