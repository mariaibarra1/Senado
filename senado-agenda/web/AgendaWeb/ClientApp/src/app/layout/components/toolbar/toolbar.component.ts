import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';

import {FuseConfigService} from '@fuse/services/config.service';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';

import {navigation} from 'app/navigation/navigation';
import {AuthService, MSUser} from "../../../services/auth.service";

import {Client} from "@microsoft/microsoft-graph-client";

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {

  usuario: MSUser = new MSUser();

  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  userStatusOptions: any[];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {TranslateService} _translateService
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private _translateService: TranslateService,
    private _authService: AuthService
  ) {
    // Set the defaults
    this.userStatusOptions = [
      {
        title: 'Online',
        icon: 'icon-checkbox-marked-circle',
        color: '#4CAF50'
      },
      {
        title: 'Away',
        icon: 'icon-clock',
        color: '#FFC107'
      },
      {
        title: 'Do not Disturb',
        icon: 'icon-minus-circle',
        color: '#F44336'
      },
      {
        title: 'Invisible',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#BDBDBD'
      },
      {
        title: 'Offline',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#616161'
      }
    ];

    this.languages = [
      {
        id: 'en',
        title: 'English',
        flag: 'us'
      },
      {
        id: 'tr',
        title: 'Turkish',
        flag: 'tr'
      }
    ];

    this.navigation = navigation;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  async ngOnInit() {

    // Subscribe to the config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((settings) => {
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });

    // Set the selected language from default languages
    this.selectedLanguage = _.find(this.languages, {id: this._translateService.currentLang});

    await this.getUserData();
  }

  ngOnDestroy(): void {

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  toggleSidebarOpen(key): void {

    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  async getUserData() {

    this.usuario = await this._authService.getUser() || new MSUser();
  }

  signOut(): void {

    this._authService.signOut();
  }

  async sendMeeting() {

    const event = {
      subject: "Prueba Senado",
      body: {
        contentType: "HTML",
        content: "Prueba de evento de Senado usando MS Graph"
      },
      start: {
        dateTime: "2019-11-26T12:00:00",
        timeZone: "Pacific Standard Time"
      },
      end: {
        dateTime: "2019-11-26T14:00:00",
        timeZone: "Pacific Standard Time"
      },
      location: {
        displayName: "PMS"
      },
      attendees: [
        {
          emailAddress: {
            address: "oscar_eloisa@hotmail.com",
            name: "Oscar Eloisa"
          },
          type: "required"
        }
      ]
    };

    let graphClient = Client.init({

      authProvider: async (done) => {

        let token = await this._authService.getAccessToken().catch((reason) => {

          done(reason, null);
        });

        if (token) {

          done(null, token);

        } else {

          done("Imposible obtener token de acceso", null);
        }
      }
    });

    let graphEvent = await graphClient.api('/me/events').post(event);

    console.log(graphEvent);

  }

  async getMeetingsInCalendar() {

    let graphClient = Client.init({

      authProvider: async (done) => {

        this._authService.getApplicationToken().subscribe(
          token => {

            if (token && token.access_token) {

              console.log(token.access_token);

              done(null, token.access_token);

            } else {

              done("Imposible obtener token de aplicación", null);
            }
          },
          error => {

            done(error, null);
          });
      }
    });

    let res = await graphClient.api('/users/senado@pms01.onmicrosoft.com/events')
    //.header('Prefer', 'outlook.timezone="Pacific Standard Time"')
    // .select('subject,body,bodyPreview,organizer,attendees,start,end,location')
      .get();

    console.log(res);
  }

  async findMeetingTime() {

    const meetingTimeSuggestionsResult = {
      attendees: [
        {
          type: "required",
          emailAddress: {
            name: "Mauricio Ozuna",
            address: "cenado@pms01.onmicrosoft.com"
          }
        }
      ],
      locationConstraint: {
        isRequired: "false",
        suggestLocation: "false",
        locations: [
          {
            resolveAvailability: "false",
            displayName: "PMS"
          }
        ]
      },
      timeConstraint: {
        activityDomain: "work",
        timeslots: [
          {
            start: {
              dateTime: "2019-11-26T09:00:00",
              timeZone: "Pacific Standard Time"
            },
            end: {
              dateTime: "2019-11-28T17:00:00",
              timeZone: "Pacific Standard Time"
            }
          }
        ]
      },
      isOrganizerOptional: "false",
      meetingDuration: "PT1H",
      returnSuggestionReasons: "true",
      minimumAttendeePercentage: "100"
    };

    let graphClient = Client.init({

      authProvider: async (done) => {

        let token = await this._authService.getAccessToken().catch((reason) => {

          done(reason, null);
        });

        if (token) {

          done(null, token);

        } else {

          done("Imposible obtener token de acceso", null);
        }
      }
    });

    let graphMeetingTime = await graphClient.api('users/mauricio.ozuna@pms01.onmicrosoft.com/findMeetingTimes').post(meetingTimeSuggestionsResult);

    console.log(graphMeetingTime);
  }
}
