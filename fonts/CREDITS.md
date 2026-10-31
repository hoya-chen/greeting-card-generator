# Fonts

`tw-kai.woff2` is a subset of **全字庫正楷體 (TW-Kai-98_1.ttf)** from the 全字庫 (CNS11643 中文標準交換碼全字庫) open data,
https://www.cns11643.gov.tw/ , released under the 政府資料開放授權條款－第1版 (Open Government Data License, version 1.0).

資料來源：全字庫正楷體，國家發展委員會「全字庫」網站，依政府資料開放授權條款第 1 版釋出。

The subset keeps ASCII, Big5 symbols and the 5,400 Big5 level-1 (常用) characters, made with:

    pyftsubset TW-Kai-98_1.ttf --text-file=chars.txt --flavor=woff2 --layout-features='*'
