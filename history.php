<?php
/** @var array $sidebar - Меню */
/** @var string $role - Список новостей */

use app\lib\UserOperations;
?>
<div class="page">
    <div class="container">
        <div class="cabinet_wrapped">
            <div class="cabinet_sidebar">
                <?php if (!empty($sidebar)) : ?>
                    <div class="menu_box">
                        <ul>
                            <?php foreach ($sidebar as $link) : ?>
                                <li>
                                    <a href="<?= $link['link'] ?>"><?= $link['title'] ?></a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endif; ?>
            </div>
            <div class="cabinet_content">
                <div class="page-content-inner">
                    <h2>История</h2>
                    <div class="news-block">
                        <?php if (!empty($product)) : ?>
                            <div class="news-list">
                                <?php foreach ($product as $item) : ?>
                                    <div class="news-item">
                                        <h3>
                                            <span> Дата Покупки <?= date('d.m.Y H:i:s',strtotime($item['date_create']))?></span>

                                        </h3>
                                        <div class="news-description">Цена: <?= $item['price'] ?> ₽</div>
                                        <div class="news-description">количество <?= $item['count'] ?> шт</div>
                                        <div class="news-description">покупатель <?= $item['login'] ?> </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>