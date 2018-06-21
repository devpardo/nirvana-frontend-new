<template>
 <div id="calendar" class="blurCalendar fc fc-unthemed fc-ltr">
    <div class="fc-toolbar">
        <div class="fc-left">
            <div class="fc-button-group">
                <button type="button" class="fc-prev-button fc-button fc-state-default fc-corner-left"><span class="fc-icon fc-icon-left-single-arrow"></span></button>
                <button type="button" class="fc-next-button fc-button fc-state-default fc-corner-right"><span class="fc-icon fc-icon-right-single-arrow"></span></button>
            </div>
            <button type="button" class="fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right">today</button>
        </div>
        <div class="fc-right">
            <div class="fc-button-group">
                <button type="button" class="fc-month-button fc-button fc-state-default fc-corner-left fc-state-active">month</button>
                <button type="button" class="fc-agendaWeek-button fc-button fc-state-default">week</button>
                <button type="button" class="fc-agendaDay-button fc-button fc-state-default fc-corner-right">day</button>
            </div>
        </div>
        <div class="fc-center">
            <h2>March 2016</h2></div>
        <div class="fc-clear"></div>
    </div>
    <div class="fc-view-container" style="">
        <div class="fc-view fc-month-view fc-basic-view" style="">
            <table>
                <thead class="fc-head">
                    <tr>
                        <td class="fc-head-container fc-widget-header">
                            <div class="fc-row fc-widget-header">
                                <table>
                                    <thead>
                                        <tr>
                                            <th class="fc-day-header fc-widget-header fc-sun"><span>Sun</span></th>
                                            <th class="fc-day-header fc-widget-header fc-mon"><span>Mon</span></th>
                                            <th class="fc-day-header fc-widget-header fc-tue"><span>Tue</span></th>
                                            <th class="fc-day-header fc-widget-header fc-wed"><span>Wed</span></th>
                                            <th class="fc-day-header fc-widget-header fc-thu"><span>Thu</span></th>
                                            <th class="fc-day-header fc-widget-header fc-fri"><span>Fri</span></th>
                                            <th class="fc-day-header fc-widget-header fc-sat"><span>Sat</span></th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody class="fc-body">
                    <tr>
                        <td class="fc-widget-content">
                            <div class="fc-scroller fc-day-grid-container" style="overflow: hidden; height: 578px;">
                                <div class="fc-day-grid fc-unselectable">
                                    <div class="fc-row fc-week fc-widget-content fc-rigid" style="height: 96px;">
                                        <div class="fc-bg">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td class="fc-day fc-widget-content fc-sun fc-other-month fc-past" data-date="2016-02-28"></td>
                                                        <td class="fc-day fc-widget-content fc-mon fc-other-month fc-past" data-date="2016-02-29"></td>
                                                        <td class="fc-day fc-widget-content fc-tue fc-past" data-date="2016-03-01"></td>
                                                        <td class="fc-day fc-widget-content fc-wed fc-past" data-date="2016-03-02"></td>
                                                        <td class="fc-day fc-widget-content fc-thu fc-past" data-date="2016-03-03"></td>
                                                        <td class="fc-day fc-widget-content fc-fri fc-past" data-date="2016-03-04"></td>
                                                        <td class="fc-day fc-widget-content fc-sat fc-past" data-date="2016-03-05"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="fc-content-skeleton">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td class="fc-day-top fc-sun fc-other-month fc-past" data-date="2016-02-28"><span class="fc-day-number">28</span></td>
                                                        <td class="fc-day-top fc-mon fc-other-month fc-past" data-date="2016-02-29"><span class="fc-day-number">29</span></td>
                                                        <td class="fc-day-top fc-tue fc-past" data-date="2016-03-01"><span class="fc-day-number">1</span></td>
                                                        <td class="fc-day-top fc-wed fc-past" data-date="2016-03-02"><span class="fc-day-number">2</span></td>
                                                        <td class="fc-day-top fc-thu fc-past" data-date="2016-03-03"><span class="fc-day-number">3</span></td>
                                                        <td class="fc-day-top fc-fri fc-past" data-date="2016-03-04"><span class="fc-day-number">4</span></td>
                                                        <td class="fc-day-top fc-sat fc-past" data-date="2016-03-05"><span class="fc-day-number">5</span></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td class="fc-event-container">
                                                            <a class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable fc-resizable" style="background-color:#6eba8c;border-color:#6eba8c">
                                                                <div class="fc-content"> <span class="fc-title">All Day Event</span></div>
                                                                <div class="fc-resizer fc-end-resizer"></div>
                                                            </a>
                                                        </td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="fc-row fc-week fc-widget-content fc-rigid" style="height: 96px;">
                                        <div class="fc-bg">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td class="fc-day fc-widget-content fc-sun fc-past" data-date="2016-03-06"></td>
                                                        <td class="fc-day fc-widget-content fc-mon fc-past" data-date="2016-03-07"></td>
                                                        <td class="fc-day fc-widget-content fc-tue fc-past" data-date="2016-03-08"></td>
                                                        <td class="fc-day fc-widget-content fc-wed fc-past" data-date="2016-03-09"></td>
                                                        <td class="fc-day fc-widget-content fc-thu fc-past" data-date="2016-03-10"></td>
                                                        <td class="fc-day fc-widget-content fc-fri fc-past" data-date="2016-03-11"></td>
                                                        <td class="fc-day fc-widget-content fc-sat fc-past" data-date="2016-03-12"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="fc-content-skeleton">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td class="fc-day-top fc-sun fc-past" data-date="2016-03-06"><span class="fc-day-number">6</span></td>
                                                        <td class="fc-day-top fc-mon fc-past" data-date="2016-03-07"><span class="fc-day-number">7</span></td>
                                                        <td class="fc-day-top fc-tue fc-past" data-date="2016-03-08"><span class="fc-day-number">8</span></td>
                                                        <td class="fc-day-top fc-wed fc-past" data-date="2016-03-09"><span class="fc-day-number">9</span></td>
                                                        <td class="fc-day-top fc-thu fc-past" data-date="2016-03-10"><span class="fc-day-number">10</span></td>
                                                        <td class="fc-day-top fc-fri fc-past" data-date="2016-03-11"><span class="fc-day-number">11</span></td>
                                                        <td class="fc-day-top fc-sat fc-past" data-date="2016-03-12"><span class="fc-day-number">12</span></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td class="fc-event-container" colspan="3">
                                                            <a class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable fc-resizable" style="background-color:#005562;border-color:#005562">
                                                                <div class="fc-content"> <span class="fc-title">Long Event</span></div>
                                                                <div class="fc-resizer fc-end-resizer"></div>
                                                            </a>
                                                        </td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="fc-row fc-week fc-widget-content fc-rigid" style="height: 96px;">
                                        <div class="fc-bg">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td class="fc-day fc-widget-content fc-sun fc-past" data-date="2016-03-13"></td>
                                                        <td class="fc-day fc-widget-content fc-mon fc-past" data-date="2016-03-14"></td>
                                                        <td class="fc-day fc-widget-content fc-tue fc-past" data-date="2016-03-15"></td>
                                                        <td class="fc-day fc-widget-content fc-wed fc-past" data-date="2016-03-16"></td>
                                                        <td class="fc-day fc-widget-content fc-thu fc-past" data-date="2016-03-17"></td>
                                                        <td class="fc-day fc-widget-content fc-fri fc-past" data-date="2016-03-18"></td>
                                                        <td class="fc-day fc-widget-content fc-sat fc-past" data-date="2016-03-19"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="fc-content-skeleton">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td class="fc-day-top fc-sun fc-past" data-date="2016-03-13"><span class="fc-day-number">13</span></td>
                                                        <td class="fc-day-top fc-mon fc-past" data-date="2016-03-14"><span class="fc-day-number">14</span></td>
                                                        <td class="fc-day-top fc-tue fc-past" data-date="2016-03-15"><span class="fc-day-number">15</span></td>
                                                        <td class="fc-day-top fc-wed fc-past" data-date="2016-03-16"><span class="fc-day-number">16</span></td>
                                                        <td class="fc-day-top fc-thu fc-past" data-date="2016-03-17"><span class="fc-day-number">17</span></td>
                                                        <td class="fc-day-top fc-fri fc-past" data-date="2016-03-18"><span class="fc-day-number">18</span></td>
                                                        <td class="fc-day-top fc-sat fc-past" data-date="2016-03-19"><span class="fc-day-number">19</span></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td class="fc-event-container">
                                                            <a class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable" style="background-color:#0e8174;border-color:#0e8174">
                                                                <div class="fc-content"><span class="fc-time">8p</span> <span class="fc-title">Dinner</span></div>
                                                            </a>
                                                        </td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="fc-row fc-week fc-widget-content fc-rigid" style="height: 96px;">
                                        <div class="fc-bg">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td class="fc-day fc-widget-content fc-sun fc-past" data-date="2016-03-20"></td>
                                                        <td class="fc-day fc-widget-content fc-mon fc-past" data-date="2016-03-21"></td>
                                                        <td class="fc-day fc-widget-content fc-tue fc-past" data-date="2016-03-22"></td>
                                                        <td class="fc-day fc-widget-content fc-wed fc-past" data-date="2016-03-23"></td>
                                                        <td class="fc-day fc-widget-content fc-thu fc-past" data-date="2016-03-24"></td>
                                                        <td class="fc-day fc-widget-content fc-fri fc-past" data-date="2016-03-25"></td>
                                                        <td class="fc-day fc-widget-content fc-sat fc-past" data-date="2016-03-26"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="fc-content-skeleton">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td class="fc-day-top fc-sun fc-past" data-date="2016-03-20"><span class="fc-day-number">20</span></td>
                                                        <td class="fc-day-top fc-mon fc-past" data-date="2016-03-21"><span class="fc-day-number">21</span></td>
                                                        <td class="fc-day-top fc-tue fc-past" data-date="2016-03-22"><span class="fc-day-number">22</span></td>
                                                        <td class="fc-day-top fc-wed fc-past" data-date="2016-03-23"><span class="fc-day-number">23</span></td>
                                                        <td class="fc-day-top fc-thu fc-past" data-date="2016-03-24"><span class="fc-day-number">24</span></td>
                                                        <td class="fc-day-top fc-fri fc-past" data-date="2016-03-25"><span class="fc-day-number">25</span></td>
                                                        <td class="fc-day-top fc-sat fc-past" data-date="2016-03-26"><span class="fc-day-number">26</span></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="fc-row fc-week fc-widget-content fc-rigid" style="height: 96px;">
                                        <div class="fc-bg">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td class="fc-day fc-widget-content fc-sun fc-past" data-date="2016-03-27"></td>
                                                        <td class="fc-day fc-widget-content fc-mon fc-past" data-date="2016-03-28"></td>
                                                        <td class="fc-day fc-widget-content fc-tue fc-past" data-date="2016-03-29"></td>
                                                        <td class="fc-day fc-widget-content fc-wed fc-past" data-date="2016-03-30"></td>
                                                        <td class="fc-day fc-widget-content fc-thu fc-past" data-date="2016-03-31"></td>
                                                        <td class="fc-day fc-widget-content fc-fri fc-other-month fc-past" data-date="2016-04-01"></td>
                                                        <td class="fc-day fc-widget-content fc-sat fc-other-month fc-past" data-date="2016-04-02"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="fc-content-skeleton">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td class="fc-day-top fc-sun fc-past" data-date="2016-03-27"><span class="fc-day-number">27</span></td>
                                                        <td class="fc-day-top fc-mon fc-past" data-date="2016-03-28"><span class="fc-day-number">28</span></td>
                                                        <td class="fc-day-top fc-tue fc-past" data-date="2016-03-29"><span class="fc-day-number">29</span></td>
                                                        <td class="fc-day-top fc-wed fc-past" data-date="2016-03-30"><span class="fc-day-number">30</span></td>
                                                        <td class="fc-day-top fc-thu fc-past" data-date="2016-03-31"><span class="fc-day-number">31</span></td>
                                                        <td class="fc-day-top fc-fri fc-other-month fc-past" data-date="2016-04-01"><span class="fc-day-number">1</span></td>
                                                        <td class="fc-day-top fc-sat fc-other-month fc-past" data-date="2016-04-02"><span class="fc-day-number">2</span></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td class="fc-event-container">
                                                            <a class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable">
                                                                <div class="fc-content"><span class="fc-time">7a</span> <span class="fc-title">Birthday Party</span></div>
                                                            </a>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="fc-row fc-week fc-widget-content fc-rigid" style="height: 98px;">
                                        <div class="fc-bg">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td class="fc-day fc-widget-content fc-sun fc-other-month fc-past" data-date="2016-04-03"></td>
                                                        <td class="fc-day fc-widget-content fc-mon fc-other-month fc-past" data-date="2016-04-04"></td>
                                                        <td class="fc-day fc-widget-content fc-tue fc-other-month fc-past" data-date="2016-04-05"></td>
                                                        <td class="fc-day fc-widget-content fc-wed fc-other-month fc-past" data-date="2016-04-06"></td>
                                                        <td class="fc-day fc-widget-content fc-thu fc-other-month fc-past" data-date="2016-04-07"></td>
                                                        <td class="fc-day fc-widget-content fc-fri fc-other-month fc-past" data-date="2016-04-08"></td>
                                                        <td class="fc-day fc-widget-content fc-sat fc-other-month fc-past" data-date="2016-04-09"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="fc-content-skeleton">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td class="fc-day-top fc-sun fc-other-month fc-past" data-date="2016-04-03"><span class="fc-day-number">3</span></td>
                                                        <td class="fc-day-top fc-mon fc-other-month fc-past" data-date="2016-04-04"><span class="fc-day-number">4</span></td>
                                                        <td class="fc-day-top fc-tue fc-other-month fc-past" data-date="2016-04-05"><span class="fc-day-number">5</span></td>
                                                        <td class="fc-day-top fc-wed fc-other-month fc-past" data-date="2016-04-06"><span class="fc-day-number">6</span></td>
                                                        <td class="fc-day-top fc-thu fc-other-month fc-past" data-date="2016-04-07"><span class="fc-day-number">7</span></td>
                                                        <td class="fc-day-top fc-fri fc-other-month fc-past" data-date="2016-04-08"><span class="fc-day-number">8</span></td>
                                                        <td class="fc-day-top fc-sat fc-other-month fc-past" data-date="2016-04-09"><span class="fc-day-number">9</span></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

</template>

<script>
export default {};
</script>

<style scoped>
.fc .fc-toolbar > * > *,
.fc-ltr .fc-popover .fc-header .fc-title,
.fc-rtl .fc-popover .fc-header .fc-close,
.fc-toolbar .fc-left {
  float: left;
}

.line-clamp {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  position: relative;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 !important;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .line-clamp:after {
    content: "...";
    text-align: right;
    bottom: 0;
    right: 0;
    width: 25%;
    display: block;
    position: absolute;
    height: calc(1em * 1.2);
  }
}

@supports (-webkit-line-clamp: 1) {
  .line-clamp:after {
    display: none !important;
  }
}

.fc-button-group,
.fc-icon {
  display: inline-block;
}

.line-clamp-1 {
  -webkit-line-clamp: 1;
  height: calc(1em * 1.2 * 1);
}

.line-clamp-2 {
  -webkit-line-clamp: 2;
  height: calc(1em * 1.2 * 2);
}

.line-clamp-3 {
  -webkit-line-clamp: 3;
  height: calc(1em * 1.2 * 3);
}

.line-clamp-4 {
  -webkit-line-clamp: 4;
  height: calc(1em * 1.2 * 4);
}

.line-clamp-5 {
  -webkit-line-clamp: 5;
  height: calc(1em * 1.2 * 5);
}

div.blurCalendar {
  font-size: 12px;
}

.fc {
  direction: ltr;
  text-align: left;
}

.fc button {
  box-sizing: border-box;
  margin: 0;
  height: 2.1em;
  padding: 0 0.6em;
  font-size: 1em;
  white-space: nowrap;
  cursor: pointer;
}

.fc button::-moz-focus-inner {
  margin: 0;
  padding: 0;
}

.fc button .fc-icon {
  position: relative;
  top: 0;
  margin: 0;
}

.fc .fc-button-group > * {
  float: left;
  margin: 0 0 0 -1px;
}

.fc .fc-button-group > :first-child {
  margin-left: 0;
}

.fc hr {
  height: 0;
  margin: 0;
  padding: 0 0 2px;
  border-style: solid;
  border-width: 1px 0;
}

.fc-bg table,
.fc-row .fc-highlight-skeleton table {
  height: 100%;
}

.fc table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 1em;
}

.fc th {
  text-align: center;
}

.fc td,
.fc th {
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0;
  vertical-align: top;
}

.fc td.fc-today {
  border-style: double;
}

.fc .fc-row {
  border: 0 solid;
}

.fc .fc-toolbar > * > * {
  margin-left: 0.75em;
}

.fc .fc-toolbar > * > :first-child {
  margin-left: 0;
}

.fc .fc-axis {
  vertical-align: middle;
  padding: 0 4px;
  white-space: nowrap;
}

.fc-rtl {
  text-align: right;
}

.fc-basic-view .fc-week-number,
.fc-toolbar {
  text-align: center;
}

.fc-unthemed .fc-popover,
.fc-unthemed .fc-row,
.fc-unthemed hr,
.fc-unthemed tbody,
.fc-unthemed td,
.fc-unthemed th,
.fc-unthemed thead {
  border-color: rgba(214, 214, 214, 0.3);
}

.fc-unthemed .fc-popover {
  background-color: #fff;
  border: 1px solid;
}

.fc-unthemed .fc-popover .fc-header,
.fc-unthemed hr {
  background: #eee;
}

.fc-unthemed .fc-popover .fc-header .fc-close {
  color: #666;
  font-size: 25px;
  margin-top: 4px;
}

.fc-unthemed .fc-today {
  background: rgba(255, 255, 255, 0.15);
}

.fc-highlight {
  background: rgba(255, 255, 255, 0.25);
  opacity: 0.3;
}

.fc-icon {
  font-size: 2em;
  font-family: "Courier New", Courier, monospace;
}

.fc-icon-left-single-arrow:after {
  content: "\02039";
  font-weight: 700;
  font-size: 100%;
}

.fc-icon-right-single-arrow:after {
  content: "\0203A";
  font-weight: 700;
  font-size: 100%;
}

.fc-icon-left-double-arrow:after {
  content: "\000AB";
}

.fc-icon-right-double-arrow:after {
  content: "\000BB";
}

.fc-icon-x:after {
  content: "\000D7";
}

.fc-state-default {
  border: 1px solid;
  outline: 0;
  background: repeat-x #f5f5f5;
  border-color: #e6e6e6 #e6e6e6 #bfbfbf;
  border-color: rgba(0, 0, 0, 0.1);
  color: #333;
}

.fc-state-default.fc-corner-left {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.fc-state-default.fc-corner-right {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.fc-state-active,
.fc-state-disabled,
.fc-state-down,
.fc-state-hover {
  color: #333;
  background-color: #e2e2e2;
}

.fc-state-hover {
  color: #333;
  text-decoration: none;
  background-position: 0 -15px;
  -webkit-transition: background-position 0.1s linear;
  transition: background-position 0.1s linear;
}

.fc-state-active,
.fc-state-down {
  background: #ccc;
}

.fc-state-disabled {
  cursor: default;
  background-image: none;
  opacity: 0.65;
  box-shadow: none;
}

.fc-event.fc-draggable,
.fc-event[href],
.fc-popover .fc-header .fc-close {
  cursor: pointer;
}

.fc-popover {
  position: absolute;
}

.fc-popover .fc-header {
  padding: 2px 4px;
}

.fc-popover .fc-header .fc-title {
  margin: 0 2px;
}

.fc-ltr .fc-popover .fc-header .fc-close,
.fc-rtl .fc-popover .fc-header .fc-title {
  float: right;
}

.fc-popover > .ui-widget-header + .ui-widget-content {
  border-top: 0;
}

.fc-clear {
  clear: both;
}

.fc-bg,
.fc-helper-skeleton,
.fc-highlight-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.fc-event,
.fc-row {
  position: relative;
}

.fc-bg {
  bottom: 0;
}

.fc-row table {
  border-left: 0 hidden transparent;
  border-right: 0 hidden transparent;
  border-bottom: 0 hidden transparent;
}

.fc-row:first-child table {
  border-top: 0 hidden transparent;
}

.fc-row .fc-bg {
  z-index: 1;
}

.fc-row .fc-highlight-skeleton {
  z-index: 2;
  bottom: 0;
}

.fc-row .fc-highlight-skeleton td {
  border-color: transparent;
}

.fc-row .fc-content-skeleton {
  position: relative;
  z-index: 3;
  padding-bottom: 2px;
}

.fc-row .fc-helper-skeleton {
  z-index: 4;
}

.fc-row .fc-content-skeleton td,
.fc-row .fc-helper-skeleton td {
  background: 0 0;
  border-color: transparent;
  border-bottom: 0;
}

.fc-row .fc-content-skeleton tbody td,
.fc-row .fc-helper-skeleton tbody td {
  border-top: 0;
}

.fc-event {
  display: block;
  font-size: 0.85em;
  line-height: 1.3;
  border: 1px solid #209e91;
  background-color: #209e91;
  font-weight: 400;
}

.fc-event,
.fc-event:hover,
.ui-widget .fc-event {
  color: #fff;
  text-decoration: none;
}

.fc-day-grid-event {
  margin: 1px 2px 0;
  padding: 0 1px;
}

.fc-ltr .fc-day-grid-event.fc-not-start,
.fc-rtl .fc-day-grid-event.fc-not-end {
  margin-left: 0;
  border-left-width: 0;
  padding-left: 1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.fc-ltr .fc-day-grid-event.fc-not-end,
.fc-rtl .fc-day-grid-event.fc-not-start {
  margin-right: 0;
  border-right-width: 0;
  padding-right: 1px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.fc-day-grid-event > .fc-content {
  white-space: nowrap;
  overflow: hidden;
}

.fc-day-grid-event .fc-time {
  font-weight: 700;
}

.fc-day-grid-event .fc-resizer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 7px;
}

.fc-ltr .fc-day-grid-event .fc-resizer {
  right: -3px;
  cursor: e-resize;
}

.fc-rtl .fc-day-grid-event .fc-resizer {
  left: -3px;
  cursor: w-resize;
}

a.fc-more {
  margin: 1px 3px;
  font-size: 0.85em;
  cursor: pointer;
  text-decoration: none;
}

a.fc-more:hover {
  text-decoration: underline;
}

.fc-limited {
  display: none;
}

.fc-day-grid .fc-row {
  z-index: 1;
}

.fc-more-popover {
  z-index: 2;
  width: 220px;
}

.fc-more-popover .fc-event-container {
  padding: 10px;
}

.fc-toolbar {
  margin-bottom: 1em;
}

.fc-toolbar .fc-right {
  float: right;
}

.fc-toolbar .fc-center {
  display: inline-block;
}

.fc-toolbar h2 {
  margin: 0;
  font-size: 24px;
  width: 100%;
  line-height: 26px;
}

.fc-toolbar button {
  position: relative;
}

.fc-toolbar .fc-state-hover,
.fc-toolbar .ui-state-hover {
  z-index: 2;
}

.fc-toolbar .fc-state-down {
  z-index: 3;
}

.fc-toolbar .fc-state-active,
.fc-toolbar .ui-state-active {
  z-index: 4;
}

.fc-toolbar button:focus {
  z-index: 5;
}

.fc-view-container *,
.fc-view-container:after,
.fc-view-container:before {
  box-sizing: content-box;
}

.fc-view,
.fc-view > table {
  position: relative;
  z-index: 1;
}

.fc-basicDay-view .fc-content-skeleton,
.fc-basicWeek-view .fc-content-skeleton {
  padding-top: 1px;
  padding-bottom: 1em;
}

.fc-basic-view tbody .fc-row {
  min-height: 4em;
  max-height: 70px;
}

.fc-row.fc-rigid {
  overflow: hidden;
}

.fc-row.fc-rigid .fc-content-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.fc-basic-view .fc-day-number,
.fc-basic-view .fc-week-number {
  padding: 0 2px;
}

.fc-basic-view td.fc-day-number,
.fc-basic-view td.fc-week-number span {
  padding-top: 2px;
  padding-bottom: 2px;
}

.fc-basic-view .fc-week-number span {
  display: inline-block;
  min-width: 1.25em;
}

.fc-ltr .fc-basic-view .fc-day-number {
  text-align: right;
}

.fc-rtl .fc-basic-view .fc-day-number {
  text-align: left;
}

.fc-day-number.fc-other-month {
  opacity: 0.3;
}

.fc-agenda-view .fc-day-grid {
  position: relative;
  z-index: 2;
}

.fc-agenda-view .fc-day-grid .fc-row {
  min-height: 3em;
}

.fc-agenda-view .fc-day-grid .fc-row .fc-content-skeleton {
  padding-top: 1px;
  padding-bottom: 1em;
}

.fc-ltr .fc-axis {
  text-align: right;
}

.fc-rtl .fc-axis {
  text-align: left;
}

.ui-widget td.fc-axis {
  font-weight: 400;
}

.fc-time-grid,
.fc-time-grid-container {
  position: relative;
  z-index: 1;
}

.fc-time-grid {
  min-height: 100%;
}

.fc-time-grid table {
  border: 0 hidden transparent;
}

.fc-time-grid > .fc-bg {
  z-index: 1;
}

.fc-time-grid .fc-slats,
.fc-time-grid > hr {
  position: relative;
  z-index: 2;
}

.fc-time-grid .fc-highlight-skeleton {
  z-index: 3;
}

.fc-time-grid .fc-content-skeleton {
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
  right: 0;
}

.fc-time-grid > .fc-helper-skeleton {
  z-index: 5;
}

.fc-slats td {
  height: 1.5em;
  border-bottom: 0;
}

.fc-slats .fc-minor td {
  border-top-style: dotted;
}

.fc-slats .ui-widget-content {
  background: 0 0;
}

.fc-time-grid .fc-highlight-container {
  position: relative;
}

.fc-time-grid .fc-highlight {
  position: absolute;
  left: 0;
  right: 0;
}

.fc-time-grid .fc-event-container {
  position: relative;
}

.fc-ltr .fc-time-grid .fc-event-container {
  margin: 0 2.5% 0 2px;
}

.fc-rtl .fc-time-grid .fc-event-container {
  margin: 0 2px 0 2.5%;
}

.fc-time-grid .fc-event {
  position: absolute;
  z-index: 1;
}

.fc-time-grid-event {
  overflow: hidden;
}

.fc-time-grid-event.fc-not-start {
  border-top-width: 0;
  padding-top: 1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.fc-time-grid-event.fc-not-end {
  border-bottom-width: 0;
  padding-bottom: 1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.fc-body > tr > .fc-widget-content,
.fc-head td,
.fc-head th {
  border: none;
}

.fc-time-grid-event > .fc-content {
  position: relative;
  z-index: 2;
}

.fc-time-grid-event .fc-title {
  padding: 0 1px;
}

.fc-time-grid-event .fc-time {
  padding: 0 1px;
  font-size: 0.85em;
  white-space: nowrap;
}

.fc-time-grid-event .fc-bg {
  z-index: 1;
  background: #fff;
  opacity: 0.25;
  filter: alpha(opacity=25);
}

.fc-time-grid-event.fc-short .fc-content {
  white-space: nowrap;
}

.fc-time-grid-event.fc-short .fc-time {
  display: inline-block;
  vertical-align: top;
}

.fc-time-grid-event.fc-short .fc-time span {
  display: none;
}

.fc-time-grid-event.fc-short .fc-time:before {
  content: attr(data-start);
}

.fc-time-grid-event.fc-short .fc-time:after {
  content: "\000A0-\000A0";
}

.fc-time-grid-event.fc-short .fc-title {
  display: inline-block;
  vertical-align: top;
  font-size: 0.85em;
  padding: 0;
}

.fc-time-grid-event .fc-resizer {
  position: absolute;
  z-index: 3;
  left: 0;
  right: 0;
  bottom: 0;
  height: 8px;
  overflow: hidden;
  line-height: 8px;
  font-size: 11px;
  font-family: monospace;
  text-align: center;
  cursor: s-resize;
}

.fc-time-grid-event .fc-resizer:after {
  content: "=";
}

.fc-day-grid-container.fc-scroller {
  height: auto !important;
}

.calendar-panel.panel .panel-body {
  padding: 0;
}

.fc-head {
  color: #fff;
  background-color: #209e91;
}

.fc-head div.fc-widget-header {
  padding: 5px 0;
}

.fc-agendaDay-button,
.fc-agendaWeek-button,
.fc-month-button,
.fc-today-button {
  display: none;
}

.blurCalendar {
  margin-top: 15px;
}

.fc-next-button,
.fc-prev-button {
  position: absolute;
  background: 0 0;
  box-shadow: none;
  border: none;
  color: #666;
}

.fc-next-button {
  left: 30px;
}

.fc-day-number {
  color: #666;
  opacity: 0.9;
}

.pie-charts {
  color: #666;
}
</style>
