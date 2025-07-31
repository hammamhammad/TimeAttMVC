import {
    Component,
    Input,
    ContentChildren,
    QueryList,
    Directive,
    TemplateRef,
    ContentChild,
    AfterContentChecked,
    Output,
    EventEmitter,
    ElementRef, Optional, OnDestroy
} from '@angular/core';
import { NgbTabsetConfig } from './tab-config';

let nextId = 0;

/**
 * This directive should be used to wrap tab titles that need to contain HTML markup or other directives.
 */
@Directive({ selector: 'ng-template[ngbTabTitle]' })
export class NgbTabTitle {
    constructor(public templateRef: TemplateRef<any>) { }
}

/**
 * This directive must be used to wrap content to be displayed in a tab.
 */
@Directive({ selector: 'ng-template[ngbTabContent]' })
export class NgbTabContent {
    constructor(public templateRef: TemplateRef<any>) { }
}

/**
 * A directive representing an individual tab.
 */
@Directive({ selector: 'ngb-tab' })
export class NgbTab {
    @Input() index: number;
    /**
     * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
     */
    @Input() id: string = `ngb-tab-${nextId++}`;
    /**
     * Simple (string only) title. Use the "NgbTabTitle" directive for more complex use-cases.
     */
    @Input() title: string;
    /**
     * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
     */
    @Input() disabled = false;
    @Input() isVisable = true;
    @ContentChild(NgbTabContent) contentTpl: NgbTabContent;
    @ContentChild(NgbTabTitle) titleTpl: NgbTabTitle;
}

/**
 * The payload of the change event fired right before the tab change
 */
export interface NgbTabChangeEvent {
    /**
     * Id of the currently active tab
     */
    activeId: string;

    /**
     * Id of the newly selected tab
     */
    nextId: string;

    /**
     * Function that will prevent tab switch if called
     */
    preventDefault: () => void;
    activeIndex: number;
    nextActiveIndex: number;
}



/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngb-tabset',
    exportAs: 'ngbTabset',
    template: `
  <div class="tabcomponent">
  <div [class]="navDivClass">
    <ul [class]="navClass()" role="tablist">
      <li class="nav-item" *ngFor="let tab of tabs" [class.active]="tab.id === activeId">
        <a *ngIf="tab.isVisable" [id]="tab.id" class="nav-link" [class.active]="tab.id === activeId" [class.disabled]="tab.disabled"
          href (click)="!!select(tab.id)" role="tab" [attr.aria-controls]="tab.id + '-panel'" [attr.aria-expanded]="tab.id === activeId">
          {{tab.title}}<ng-template [ngTemplateOutlet]="tab.titleTpl?.templateRef"></ng-template>
        </a>
      </li>
    </ul>
    </div>
    <div [class]="contentDivClass">
    <div class="tab-content">
      <ng-template ngFor let-tab [ngForOf]="tabs">
        <div class="tab-pane" [class.active]="tab.id === activeId" role="tabpanel" [attr.aria-labelledby]="tab.id" id="{{tab.id}}-panel">
          <ng-template [ngTemplateOutlet]="tab.contentTpl.templateRef"></ng-template>
        </div>
      </ng-template>
    </div>
    </div>
    </div>
  `
})
export class NgbTabset implements AfterContentChecked, OnDestroy {
    @ContentChildren(NgbTab) tabs: QueryList<NgbTab>;

    @Input() navDivClass: string = "";
    @Input() contentDivClass: string = "";
    @Input() customClass: string;
    /**
     * An identifier of an initially selected (active) tab. Use the "select" method to switch a tab programmatically.
     */
    @Input() activeId: string;
    activeIndex: number;

    /**
     * The horizontal alignment of the nav with flexbox utilities. Can be one of 'start', 'center' or 'end'
     */
    @Input() justify: 'start' | 'center' | 'end';

    /**
     * Type of navigation to be used for tabs. Can be one of 'tabs' or 'pills'.
     */
    @Input() type: 'tabs' | 'pills';

    /**
     * A tab change event fired right before the tab selection happens. See NgbTabChangeEvent for payload details
     */
    @Output() tabChange = new EventEmitter<NgbTabChangeEvent>();

    navClass(): string {
        return 'nav nav-' + this.type + ' justify-content-' + this.justify + (this.customClass ? ' ' + this.customClass : '');
    }
    constructor(config: NgbTabsetConfig) {
        this.type = config.type;
        this.justify = config.justify;
    }

    /**
     * Selects the tab with the given id and shows its associated pane.
     * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
     */
    select(tabId: string) {
        let selectedTab = this._getTabById(tabId);
        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
            let defaultPrevented = false;

            this.tabChange.emit(
                { activeId: this.activeId, nextId: selectedTab.id, activeIndex: this.activeIndex, nextActiveIndex: selectedTab.index, preventDefault: () => { defaultPrevented = true; } });

            if (!defaultPrevented) {
                this.activeId = selectedTab.id;
            }
        }
    }
    selectbyIndex(tabIndex: number) {
        let selectedTab = this._getTabByIndex(tabIndex);
        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
            let defaultPrevented = false;

            this.tabChange.emit(
                { activeId: this.activeId, nextId: selectedTab.id, activeIndex: this.activeIndex, nextActiveIndex: selectedTab.index, preventDefault: () => { defaultPrevented = true; } });

            if (!defaultPrevented) {
                this.activeId = selectedTab.id;
            }
        }
    }
    ngAfterContentChecked() {
        // auto-correct activeId that might have been set incorrectly as input
        let activeTab = this._getTabById(this.activeId);
        if (activeTab && !activeTab.isVisable) {
            let tabsWithId: NgbTab[] = this.tabs.filter(tab => tab.isVisable);
            if (tabsWithId.length > 0)
                activeTab = tabsWithId[0];
        }
        this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
        this.activeIndex = activeTab ? activeTab.index : (this.tabs.length ? this.tabs.first.index : 0);
    }

    private _getTabById(id: string): NgbTab {
        let tabsWithId: NgbTab[] = this.tabs.filter(tab => tab.id === id);
        return tabsWithId.length ? tabsWithId[0] : null;
    }
    private _getTabByIndex(index: number): NgbTab {
        let tabsWithId: NgbTab[] = this.tabs.filter(tab => tab.index.toString() === index.toString());
        return tabsWithId.length ? tabsWithId[0] : null;
    }
    ngOnDestroy() {
        nextId = 0;
    }
}
@Directive({
    selector: '[Tabautofocus]'
})
export class TabAutofocusDirective {
    constructor(private el: ElementRef, @Optional() private tab: NgbTabset) {
        if (tab) {
            this.tab.tabChange.subscribe(() => {
                setTimeout(function () {
                    this.el.nativeElement.focus();
                }.bind(this), 300);

            });
        }
    }
}