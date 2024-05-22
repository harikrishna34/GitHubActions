import { Component, OnInit,Injectable,NgModule,Pipe, PipeTransform  } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: string ) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}