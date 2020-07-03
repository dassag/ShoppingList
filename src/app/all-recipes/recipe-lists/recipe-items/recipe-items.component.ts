import { Component, OnInit,Input} from '@angular/core';
import { Recipe } from '../../recipe.model';


@Component({
  selector: 'app-recipe-items',
  templateUrl: './recipe-items.component.html',
  styleUrls: ['./recipe-items.component.css']
})
export class RecipeItemsComponent implements OnInit {
  @Input() recipe:Recipe;
  @Input() index:number;
  //@Output() recipeSelected= new EventEmitter<void>(); used for emitting event for communication

  //recipe:Recipe;


  ngOnInit(): void {
  }

  // displayRecipe(){
  //   //this.recipeSelected.emit();
  //   this.allRecipe.recipeSelected.emit(this.recipe);
  // }

}
