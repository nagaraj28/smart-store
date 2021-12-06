import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Products } from './products';
import { URL } from 'src/config/config';

@Injectable({
  providedIn: 'root'
}) 
export class ProductsService {

  actualProducts!:Products[];
  modifiedProducts!:Products[];
  filteredCategories!:Products[];
  constructor(private http:HttpClient) { }
  
  /**
   * gets all the products service
   */
  getAllProducts():Observable<Products[]>{
        return this.http.get<Products[]>(URL+"products").pipe(
          tap((data:any)=>{
            this.actualProducts = data.products;
            this.modifiedProducts =data.products;
            // console.log("products fetched...",data)
          }),
          catchError(this.handleError)
        );
  }

  /**
   * gets all the brands service
   */
  getAllBrands():Observable<any[]>{
    return this.http.get<any[]>(URL+'products/brands').pipe(
      tap((data)=>{
        
        // console.log("brands fetched call.",data)
      }),
      catchError(this.handleError)
    );
  }

    /**
   * gets all the categories service
   */
     getAllCategories():Observable<any[]>{
      return this.http.get<any[]>(URL+'products/categories').pipe(
        tap((data:any)=>{
          // console.log("categories fetched call",data)
        }),
        catchError(this.handleError)
      );
    }

    /*
    filter based on categories and brands
    */
    getFilteredData(categoryFilter:any,brandFilter:any,sort:string){
          console.log(this.actualProducts);
          this.modifiedProducts = this.actualProducts;
          this.filteredCategories = this.actualProducts;
          let filterData:any[]=[];
          if(categoryFilter.audio===true){
            // console.log(this.modifiedProducts,this.actualProducts);
          let data=this.modifiedProducts.filter((prod)=>prod.category==="audio");
          filterData=[...filterData,...data];  
          // console.log(filterData)
          //  this.modifiedProducts=filterData;
          }
          if(categoryFilter.lights===true){
            // console.log(this.modifiedProducts,this.actualProducts);
            let data=this.modifiedProducts.filter((prod)=>prod.category==="lights");
          filterData=[...filterData,...data];  

          //  this.modifiedProducts=filterData;

          }
          if(categoryFilter.vr===true){
            // console.log(this.modifiedProducts,this.actualProducts);
            let data=this.modifiedProducts.filter((prod)=>prod.category==="vr");
          filterData=[...filterData,...data];  

          //  this.modifiedProducts=filterData;
          }
          if(categoryFilter.mop===true){
            // console.log(this.modifiedProducts,this.actualProducts);
            let data=this.modifiedProducts.filter((prod)=>prod.category==="mop");
          filterData=[...filterData,...data];  

          //  this.modifiedProducts=filterData;
          }
          if(categoryFilter.plugs===true){
            // console.log(this.modifiedProducts,this.actualProducts);
            let data=this.modifiedProducts.filter((prod)=>prod.category==="plugs");
          filterData=[...filterData,...data];  

          //  this.modifiedProducts=filterData;
          }
          if(categoryFilter.watch===true){
            // console.log(this.modifiedProducts,this.actualProducts);
            let data=this.modifiedProducts.filter((prod)=>prod.category==="watch");
            filterData=[...filterData,...data];  
            // this.modifiedProducts=filterData;
          }
          if(categoryFilter.audio || categoryFilter.lights || categoryFilter.vr || categoryFilter.mop || categoryFilter.plugs || categoryFilter.watch)
          this.filteredCategories = filterData;
          else
          this.filteredCategories=this.actualProducts;
          let brandsFilteredData:any[] = [];
          if(brandFilter.Amazon){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="Amazon");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.Apple){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="Apple");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.Avelon){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="Avelon");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.Google){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="Google");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.HTC){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="HTC");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.Havells){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="Havells");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.Irobot){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="Irobot");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.Kodak){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="Kodak");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.Maru){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="Maru");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.Mi){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="Mi");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.Oculus){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="Oculus");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.Philips){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="Philips");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.Samsung){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="Samsung");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.Shinecon){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="Shinecon");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.Wipro){
            let data=this.filteredCategories.filter((prod)=>prod.brand==="Wipro");
            brandsFilteredData=[...brandsFilteredData,...data];  
          }
          if(brandFilter.Amazon || brandFilter.Apple || brandFilter.Avelon || brandFilter.Google || brandFilter.HTC || brandFilter.Havells
            || brandFilter.Irobot || brandFilter.Kodak || brandFilter.Maru || brandFilter.Mi || brandFilter.Oculus || brandFilter.Philips || brandFilter.Samsung
            || brandFilter.Shinecon ||brandFilter.Wipro){
              this.modifiedProducts = this.sortItems(brandsFilteredData,sort);
            }
            else{
              this.modifiedProducts = this.sortItems(this.filteredCategories,sort);
            }
    }

    /* 
    sorting products by price
    */
    sortItems(data:Products[],sort:string):Products[]{
      if(sort==="low"){
        // console.log(sort);
        return data.sort((firstProduct,secondProduct)=>firstProduct.offerPrice-secondProduct.offerPrice);
      }
      else if(sort==="high"){
        // console.log(sort);
        return data.sort((firstProduct,secondProduct)=>secondProduct.offerPrice-firstProduct.offerPrice);
      }
      else{
        // console.log(sort);
        // console.log(data);
       return data;
        // return data.sort((firstProduct,secondProduct)=>secondProduct.avgRating-firstProduct.avgRating);
      }
    }

    /*
    add item to cart
    */
    addToCart(data:any,quantity:number):Observable<any>{
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      let options={
        userid:"61a90be83a201bfb11a743db",
        productid:data,
        quantity:quantity
      }
      // console.log("add to cart items",optionsObject)
      const urlLink = URL+'ecommerceuser/addcart'
      const optionsObject = JSON.stringify(options);
      console.log(urlLink);
       return this.http.post<any>(urlLink,options,{headers:headers}).pipe(
          tap(data=>console.log("add to cart console message",data)),
          catchError(err=>this.handleError(err))
          );
    }


    /*
    add item to wishlist
    */
    
    addToWishlist(data:any):Observable<any>{
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json; charset=utf-8');
      const options={
        userid:"61a90be83a201bfb11a743db",
        productid:data
            }
          return this.http.post<any>(URL+'ecommerceuser/addwishlist',options,{headers:headers}).pipe(
          tap(data=>console.log("add to wishlist console message",data)),
          catchError(err=>this.handleError(err))
          );
    }

    /*
    delete item to cart
    */
    
    deleteFromWishlist(data:any):Observable<any>{
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json; charset=utf-8');
            const options = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
              body: {
                userid: "61a90be83a201bfb11a743db",
                productid: data,
              },
            };
        return this.http.delete<any>(URL+'ecommerceuser/deletefromcart',options).pipe(
          tap(data=>console.log("delete wishlist console message",data)),
          catchError(err=>this.handleError(err))
          );
    }


  private handleError(httpError:HttpErrorResponse):Observable<any>{
    console.log("error ")
        const errorMessage = "some error occured in fetching products,please refresh ";
        return throwError(errorMessage);
  }
}
