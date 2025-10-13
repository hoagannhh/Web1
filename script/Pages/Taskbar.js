import { ButtonVerification  } from "./ButtonVerification .js"
export const TaskBar = {
    html : [`    <div class="task-bar">
      <div class="Header">
        <div class="Name-Shop">
          <p class="name">ĐẾ VƯƠNG</p>
        </div>
        <div class="Search-taskbar">
          <input class="Search" type="text" placeholder="Search" />
          <img class="Search-icon" src="../icon/Search.png" />
        </div>
        ${ButtonVerification }
        
      </div>

      <div class="menu">
        <button class="test">
          Men's
          <div class="box men">
            <div class="dropdown-content">
              <div class="column">
                <h4>SHOP BY SIZE</h4>
                <ul class="size-grid">
                  <li class="size-btn">38</li>
                  <li class="size-btn">39</li>
                  <li class="size-btn">40</li>
                  <li class="size-btn">38</li>
                  <li class="size-btn">39</li>
                  <li class="size-btn">40</li>
                  <li class="size-btn">38</li>
                  <li class="size-btn">39</li>
                  <li class="size-btn">40</li>
                </ul>
              </div>
              <div class="column">
                <h4>BRANDS</h4>
                <ul class="brands">
                  <li><img class="company" src="../icon/nike.png" /></li>
                  <li><img class="company" src="../icon/vans.png" /></li>
                  <li><img class="company" src="../icon/nb.png" /></li>
                  <li><img class="company" src="../icon/converse.png" /></li>
                  <li><img class="company" src="../icon/adidas.png" /></li>
                  <li><img class="company" src="../icon/onitsuka.png" /></li>
                  <li><img class="company" src="../icon/skechers.png" /></li>
                  <li><img class="company" src="../icon/puma.png" /></li>
                </ul>
              </div>
              <div class="column">
                <h4>BEST SELLERS</h4>
                <div class="sellers">
                  <div class="product">
                    <img
                      class="product-image"
                      src="../img/nike-air-force.png"
                    />
                    <p class="name-product">NIKE AIR FORCE</p>
                  </div>
                  <div class="product">
                    <img
                      class="product-image"
                      src="../img/ADIDAS-ULTRABOOST.png"
                    />
                    <p class="name-product">ADIDAS ULTRABOOST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
        <button class="test">
          Women's
          <div class="box women">
            <div class="dropdown-content">
              <div class="column">
                <h4>SHOP BY SIZE</h4>
                <ul class="size-grid">
                  <li class="size-btn">38</li>
                  <li class="size-btn">39</li>
                  <li class="size-btn">40</li>
                  <li class="size-btn">38</li>
                  <li class="size-btn">39</li>
                  <li class="size-btn">40</li>
                  <li class="size-btn">38</li>
                  <li class="size-btn">39</li>
                  <li class="size-btn">40</li>
                </ul>
              </div>
              <div class="column">
                <h4>BRANDS</h4>
                <ul class="brands">
                  <li><img class="company" src="../icon/nike.png" /></li>
                  <li><img class="company" src="../icon/vans.png" /></li>
                  <li><img class="company" src="../icon/nb.png" /></li>
                  <li><img class="company" src="../icon/converse.png" /></li>
                  <li><img class="company" src="../icon/adidas.png" /></li>
                  <li><img class="company" src="../icon/onitsuka.png" /></li>
                  <li><img class="company" src="../icon/skechers.png" /></li>
                  <li><img class="company" src="../icon/puma.png" /></li>
                </ul>
              </div>
              <div class="column">
                <h4>BEST SELLERS</h4>
                <div class="sellers">
                  <div class="product">
                    <img
                      class="product-image"
                      src="../img/nike-air-force.png"
                    />
                    <p class="name-product">NIKE AIR FORCE</p>
                  </div>
                  <div class="product">
                    <img
                      class="product-image"
                      src="../img/ADIDAS-ULTRABOOST.png"
                    />
                    <p class="name-product">ADIDAS ULTRABOOST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
        <button class="test">
          Kid's
          <div class="box kid">
            <div class="dropdown-content">
              <div class="column">
                <h4>SHOP BY SIZE</h4>
                <ul class="size-grid kid-size">
                  <div class="size-column">
                    <p class="size-type">0-12 months</p>
                    <ul class="size-menu">
                      <li class="size-btn">38</li>
                      <li class="size-btn">39</li>
                      <li class="size-btn">40</li>
                      <li class="size-btn">38</li>
                      <li class="size-btn">39</li>
                      <li class="size-btn">40</li>
                      <li class="size-btn">38</li>
                      <li class="size-btn">39</li>
                    </ul>
                  </div>
                  <div class="size-column">
                    <p class="size-type">1-5 year old</p>
                    <ul class="size-menu">
                      <li class="size-btn">40</li>
                      <li class="size-btn">38</li>
                      <li class="size-btn">39</li>
                      <li class="size-btn">40</li>
                      <li class="size-btn">38</li>
                      <li class="size-btn">39</li>
                      <li class="size-btn">40</li>
                      <li class="size-btn">40</li>
                    </ul>
                  </div>
                  <div class="size-column">
                    <p class="size-type">5-10 year old</p>
                    <ul class="size-menu">
                      <li class="size-btn">40</li>
                      <li class="size-btn">38</li>
                      <li class="size-btn">39</li>
                      <li class="size-btn">40</li>
                      <li class="size-btn">38</li>
                      <li class="size-btn">39</li>
                    </ul>
                  </div>
                </ul>
              </div>
              <div class="column">
                <h4>BRANDS</h4>
                <ul class="brands">
                  <li><img class="company" src="../icon/nike.png" /></li>
                  <li><img class="company" src="../icon/vans.png" /></li>
                  <li><img class="company" src="../icon/nb.png" /></li>
                  <li><img class="company" src="../icon/converse.png" /></li>
                  <li><img class="company" src="../icon/adidas.png" /></li>
                  <li><img class="company" src="../icon/onitsuka.png" /></li>
                  <li><img class="company" src="../icon/skechers.png" /></li>
                  <li><img class="company" src="../icon/puma.png" /></li>
                </ul>
              </div>
              <div class="column">
                <h4>BEST SELLERS</h4>
                <div class="sellers">
                  <div class="product">
                    <img class="product-image" src="../img/NIKE-VOMERO.png" />
                    <p class="name-product">NIKE VOMERO</p>
                  </div>
                  <div class="product">
                    <img
                      class="product-image"
                      src="../img/ADIDAS-ULTRABOOST.png"
                    />
                    <p class="name-product">ADIDAS ULTRABOOST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
        <span class="split-menu">&#124;</span>
        <button class="test">
          Brands
          <div class="box BRANDS">
            <h4 class="title">BRANDS</h4>
            <ul class="brands-menu">
              <li>
                <img class="company-brands-menu" src="../icon/nike.png" />
              </li>
              <li>
                <img class="company-brands-menu" src="../icon/vans.png" />
              </li>
              <li><img class="company-brands-menu" src="../icon/nb.png" /></li>
              <li>
                <img class="company-brands-menu" src="../icon/converse.png" />
              </li>
              <li>
                <img class="company-brands-menu" src="../icon/adidas.png" />
              </li>
              <li>
                <img class="company-brands-menu" src="../icon/onitsuka.png" />
              </li>
              <li>
                <img class="company-brands-menu" src="../icon/skechers.png" />
              </li>
              <li>
                <img class="company-brands-menu" src="../icon/puma.png" />
              </li>
              <li>
                <img class="company-brands-menu" src="../icon/puma.png" />
              </li>
              <li>
                <img class="company-brands-menu" src="../icon/puma.png" />
              </li>
            </ul>
          </div>
        </button>

        <button class="test">Sale</button>
        <button class="test">New Arrivals</button>
        <span class="split-menu">&#124;</span>
        <button class="test">36 SNEAKERS</button>
        <div class="bag"><img class="bag-icon" src="../icon/bag.png" /></div>
      </div>
    </div>`],
    css  : [`../css/taskbar.css`]
}