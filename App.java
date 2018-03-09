package fr.insta.saman;

import java.util.Scanner;


public class App 
{
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
        Scanner sc = new Scanner(System.in);
        System.out.println("Saisissez un entier : ");
        int val1 = sc.nextInt();
        
        System.out.println("Saisissez un autre entier : ");
        int val2 = sc.nextInt();
        
        int somme = val1 + val2;
        
        System.out.println(val1+" + "+ val2 + " = " + somme);
    }
}
